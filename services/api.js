import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export const api = axios.create({
  baseURL: API_URL,
});

export const fetchCampersApi = async (page = 1, limit = 4, filters = {}) => {
  const params = {
    page,
    limit,
  };

  if (filters) {
    if (filters.location) {
      params.location = filters.location;
    }
    if (filters.form) {
      params.form = filters.form;
    }

    // Handle features filtering
    if (filters.features && filters.features.length > 0) {
      filters.features.forEach((feature) => {
        if (feature === "transmission") {
          params.transmission = "automatic";
        } else {
          params[feature] = true;
        }
      });
    }
  }

  const response = await api.get("/campers", { params });
  return response.data;
};

export const fetchCamperByIdApi = async (id) => {
  const response = await api.get(`/campers/${id}`);
  return response.data;
};
