import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { Button } from './Button.jsx';
import { FeaturesList } from './FeaturesList.jsx';
import { formatPrice, getGalleryImages } from '../utils/helpers.js';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/campersSlice';

export const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.campers.favorites);
  const isFav = favorites.includes(camper.id);

  const handleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  const images = getGalleryImages(camper.gallery);
  // Fallback to a placeholder if no images found
  const mainImage = images.length > 0 ? images[0] : 'https://placehold.co/400x300?text=No+Image';

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full md:w-[290px] h-[310px] flex-shrink-0 rounded-xl overflow-hidden">
        <img
          src={mainImage}
          alt={camper.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-semibold text-secondary truncate max-w-[70%]">{camper.name}</h2>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-secondary">{formatPrice(camper.price)}</span>
              <button onClick={handleFavorite} className="focus:outline-none">
                <Heart className={`w-6 h-6 transition-colors ${isFav ? 'fill-primary text-primary' : 'text-secondary'}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6 text-secondary text-sm">
            <div className="flex items-center gap-1 underline decoration-gray-300">
              <Star className="w-4 h-4 text-rating fill-rating" />
              <span className="font-medium">{camper.rating}</span>
              <span className="text-subtext">({camper.reviews?.length || 0} Reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-subtext" />
              <span>{camper.location}</span>
            </div>
          </div>

          <div className="mb-6 text-subtext text-sm line-clamp-1 overflow-hidden text-ellipsis">
            {camper.description}
          </div>

          <div className="mb-6">
            <FeaturesList camper={camper} limit={6} />
          </div>
        </div>

        <div>
          <Link to={`/catalog/${camper.id}`}>
            <Button size="md">
              Show more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};