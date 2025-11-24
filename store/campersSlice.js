import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCampersApi } from "../services/api.js";

// Helper to load favorites from local storage
const loadFavorites = () => {
  try {
    const serialized = localStorage.getItem("favorites");
    return serialized ? JSON.parse(serialized) : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  items: [],
  favorites: loadFavorites(),
  isLoading: false,
  error: null,
  currentPage: 1,
  totalItems: 0,
  filters: {
    location: "",
    form: "",
    features: [],
  },
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState().campers;
    const { currentPage, filters } = state;
    try {
      // Limit set to 4 as per requirements
      const data = await fetchCampersApi(currentPage, 4, filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch campers");
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.items = []; // Clear items on new filter
      state.currentPage = 1; // Reset page
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    resetCampers: (state) => {
      state.items = [];
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        let fetchedItems = [];

        if (Array.isArray(action.payload)) {
          fetchedItems = action.payload;
        } else if (action.payload && typeof action.payload === "object") {
          if (Array.isArray(action.payload.items)) {
            fetchedItems = action.payload.items;
          }
        }

        if (!Array.isArray(state.items)) {
          state.items = [];
        }

        if (state.currentPage === 1) {
          state.items = fetchedItems;
        } else {
          // Append new items, avoiding duplicates
          if (fetchedItems.length > 0) {
            const existingIds = new Set(state.items.map((i) => i.id));
            const uniqueNewItems = fetchedItems.filter(
              (item) => !existingIds.has(item.id)
            );
            state.items = [...state.items, ...uniqueNewItems];
          }
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, setFilters, incrementPage, resetCampers } =
  campersSlice.actions;
export default campersSlice.reducer;
