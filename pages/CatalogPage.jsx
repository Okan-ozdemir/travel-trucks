import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, incrementPage } from '../store/campersSlice.js';
import { FilterSidebar } from '../components/FilterSidebar.jsx';
import { CamperCard } from '../components/CamperCard.jsx';
import { Button } from '../components/Button.jsx';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, filters } = useSelector((state) => state.campers);

  // Initial fetch only if empty (or when filters change, which clears items)
  useEffect(() => {
    // We check if it's the very first load or if filters changed requiring a refresh
    dispatch(fetchCampers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchCampers());
  };

  // Safe check for items being an array
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-16">
        <FilterSidebar />

        <div className="flex-1">
          {safeItems.length === 0 && !isLoading && !error && (
            <div className="text-center text-subtext py-10">
              No campers found matching your criteria.
            </div>
          )}

          <div className="space-y-8 mb-12">
            {safeItems.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
          </div>

          {isLoading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 mb-4">
              Error: {typeof error === 'string' ? error : 'An unknown error occurred'}
            </div>
          )}

          {/* MockAPI logic for load more */}
          {!isLoading && safeItems.length > 0 && safeItems.length % 4 === 0 && (
             <div className="flex justify-center">
               <Button variant="outline" onClick={handleLoadMore}>
                 Load more
               </Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;