import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/campersSlice';
import { Button } from './Button.jsx';
import { MapPin, Wind, ChefHat, Tv, ShowerHead, Grid, LayoutGrid, LayoutTemplate, List } from 'lucide-react';

export const FilterSidebar = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState([]);
  const [form, setForm] = useState('');

  const handleFeatureChange = (feature) => {
    setFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const handleSearch = () => {
    dispatch(setFilters({ location, form, features }));
  };

  const equipmentOptions = [
    { id: 'AC', label: 'AC', icon: <Wind className="w-6 h-6" /> },
    { id: 'transmission', label: 'Automatic', icon: <List className="w-6 h-6" /> },
    { id: 'kitchen', label: 'Kitchen', icon: <ChefHat className="w-6 h-6" /> },
    { id: 'TV', label: 'TV', icon: <Tv className="w-6 h-6" /> },
    { id: 'shower', label: 'Shower/WC', icon: <ShowerHead className="w-6 h-6" /> },
  ];

  const typeOptions = [
    { id: 'panelTruck', label: 'Van', icon: <Grid className="w-8 h-8" /> },
    { id: 'fullyIntegrated', label: 'Fully Integrated', icon: <LayoutGrid className="w-8 h-8" /> },
    { id: 'alcove', label: 'Alcove', icon: <LayoutTemplate className="w-8 h-8" /> },
  ];

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 space-y-8">
      {/* Location */}
      <div>
        <label className="block text-subtext font-medium mb-2">Location</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="w-5 h-5 text-subtext" />
          </div>
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3 bg-input rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Kyiv, Ukraine"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div>
        <p className="text-subtext font-medium mb-6">Filters</p>

        {/* Equipment */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-secondary border-t pt-6 mb-6">Vehicle equipment</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 gap-3">
            {equipmentOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleFeatureChange(opt.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border h-[95px] transition-all ${
                  features.includes(opt.id)
                    ? 'border-primary bg-white'
                    : 'border-gray-200 bg-transparent hover:border-primary'
                }`}
              >
                <div className="mb-2 text-secondary">{opt.icon}</div>
                <span className="text-sm font-medium text-secondary text-center">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <h3 className="text-xl font-semibold text-secondary border-t pt-6 mb-6">Vehicle type</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-2 gap-3">
            {typeOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setForm(opt.id === form ? '' : opt.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border h-[95px] transition-all ${
                  form === opt.id
                    ? 'border-primary bg-white'
                    : 'border-gray-200 bg-transparent hover:border-primary'
                }`}
              >
                <div className="mb-2 text-secondary">{opt.icon}</div>
                <span className="text-sm font-medium text-secondary text-center">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={handleSearch} className="w-40">Search</Button>
      </div>
    </div>
  );
};