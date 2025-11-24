import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { fetchCamperByIdApi } from '../services/api.js';
import { formatPrice, getGalleryImages, formatString } from '../utils/helpers.js';
import { FeaturesList } from '../components/FeaturesList.jsx';
import { BookingForm } from '../components/BookingForm.jsx';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('features');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadCamper = async () => {
      if (!id) return;
      try {
        const data = await fetchCamperByIdApi(id);
        setCamper(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCamper();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!camper) return <div className="h-screen flex items-center justify-center">Camper not found</div>;

  const reviewsCount = camper.reviews?.length || 0;
  const galleryImages = getGalleryImages(camper.gallery);

  return (
    <div className="container mx-auto px-4 py-10 pb-20 scroll-smooth">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">{camper.name}</h1>
        <div className="flex items-center gap-4 text-secondary text-sm">
          <div className="flex items-center gap-1 underline decoration-gray-300 cursor-pointer" onClick={() => setActiveTab('reviews')}>
            <Star className="w-4 h-4 text-rating fill-rating" />
            <span className="font-medium">{camper.rating}</span>
            <span className="text-subtext">({reviewsCount} Reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-subtext" />
            <span>{camper.location}</span>
          </div>
        </div>
        <div className="mt-4 text-2xl font-semibold text-secondary">
          {formatPrice(camper.price)}
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[400px] mb-8">
        {galleryImages.length > 0 ? (
          galleryImages.map((img, idx) => (
            <div key={idx} className={`rounded-xl overflow-hidden cursor-pointer ${idx === 0 ? 'md:col-span-2 md:row-span-2 h-[300px] md:h-full' : 'h-[200px] md:h-full'}`}>
              <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onClick={() => setSelectedImage(img)} />
            </div>
          ))
        ) : (
          <div className="md:col-span-4 h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
            No images available
          </div>
        )}
      </div>

      {/* Description */}
      <div className="text-secondary mb-12 text-lg leading-relaxed">
        {camper.description}
      </div>

      {/* Tabs */}
      <div className="flex gap-10 border-b border-gray-200 mb-10">
        <button
          onClick={() => setActiveTab('features')}
          className={`pb-6 text-xl font-semibold transition-all relative ${activeTab === 'features' ? 'text-secondary' : 'text-gray-400 hover:text-secondary'}`}
        >
          Features
          {activeTab === 'features' && <span className="absolute bottom-0 left-0 w-full h-[5px] bg-primary rounded-t-lg"></span>}
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-6 text-xl font-semibold transition-all relative ${activeTab === 'reviews' ? 'text-secondary' : 'text-gray-400 hover:text-secondary'}`}
        >
          Reviews
          {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-[5px] bg-primary rounded-t-lg"></span>}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Column Content */}
        <div className="w-full lg:w-1/2">
          {activeTab === 'features' && (
            <div className="animate-fadeIn">
              <div className="mb-12">
                 <FeaturesList camper={camper} />
              </div>

              <h3 className="text-xl font-bold text-secondary border-b border-gray-200 pb-6 mb-6">Vehicle details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center font-medium text-lg">
                  <span className="text-secondary">Form</span>
                  <span className="text-secondary capitalize">{formatString(camper.form)}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span className="text-secondary">Length</span>
                  <span className="text-secondary">{formatString(camper.length)}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span className="text-secondary">Width</span>
                  <span className="text-secondary">{formatString(camper.width)}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span className="text-secondary">Height</span>
                  <span className="text-secondary">{formatString(camper.height)}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span className="text-secondary">Tank</span>
                  <span className="text-secondary">{formatString(camper.tank)}</span>
                </div>
                <div className="flex justify-between items-center font-medium text-lg">
                  <span className="text-secondary">Consumption</span>
                  <span className="text-secondary">{formatString(camper.consumption)}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
             <div className="space-y-8 animate-fadeIn">
               {camper.reviews && camper.reviews.length > 0 ? (
                 camper.reviews.map((review, idx) => (
                   <div key={idx} className="border-b border-gray-100 pb-8 last:border-0">
                     <div className="flex items-center gap-4 mb-4">
                       <div className="w-16 h-16 rounded-full bg-badge flex items-center justify-center text-2xl font-bold text-primary">
                         {review.reviewer_name.charAt(0).toUpperCase()}
                       </div>
                       <div>
                         <div className="font-semibold text-lg text-secondary mb-1">{review.reviewer_name}</div>
                         <div className="flex text-rating gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < review.reviewer_rating ? 'fill-current' : 'text-gray-200'}`} />
                            ))}
                         </div>
                       </div>
                     </div>
                     <p className="text-subtext text-base leading-relaxed">{review.comment}</p>
                   </div>
                 ))
               ) : (
                 <p className="text-subtext italic">No reviews available for this camper.</p>
               )}
             </div>
          )}
        </div>

        {/* Right Column: Booking Form */}
        <div className="w-full lg:w-1/2 lg:pl-10">
           <div className="sticky top-24">
             <BookingForm />
           </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img src={selectedImage} alt="Enlarged view" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CamperDetailsPage;