import React from 'react';
import { Wind, MapPin, Fuel, LayoutGrid, Settings, Users, Bed, Disc, Snowflake, Radio, Tv, ShowerHead, ChefHat, Droplet, Flame, Microwave } from 'lucide-react';

// Icon mapping
const getIcon = (key) => {
  switch (key.toLowerCase()) {
    case 'transmission': return <Settings className="w-5 h-5" />;
    case 'ac':
    case 'airconditioner': return <Wind className="w-5 h-5" />;
    case 'kitchen': return <ChefHat className="w-5 h-5" />;
    case 'tv': return <Tv className="w-5 h-5" />;
    case 'shower': return <ShowerHead className="w-5 h-5" />;
    case 'bathroom': return <ShowerHead className="w-5 h-5" />;
    case 'radio': return <Radio className="w-5 h-5" />;
    case 'freezer': return <Snowflake className="w-5 h-5" />;
    case 'cd': return <Disc className="w-5 h-5" />;
    case 'beds': return <Bed className="w-5 h-5" />;
    case 'people':
    case 'adults': return <Users className="w-5 h-5" />;
    case 'engine':
    case 'petrol': return <Fuel className="w-5 h-5" />;
    case 'water': return <Droplet className="w-5 h-5" />;
    case 'gas': return <Flame className="w-5 h-5" />;
    case 'microwave': return <Microwave className="w-5 h-5" />;
    default: return <LayoutGrid className="w-5 h-5" />;
  }
};

export const FeaturesList = ({ camper, limit = 0 }) => {
  if (!camper) return null;

  const features = [];

  if (camper.adults) features.push({ label: `${camper.adults} adults`, key: 'adults' });
  if (camper.transmission) features.push({ label: camper.transmission, key: 'transmission' });
  if (camper.engine) features.push({ label: camper.engine, key: 'engine' });

  // Merge top level properties with details to handle flat vs nested API structures
  const combinedDetails = {
    ...(camper.details || {}),
    ...camper // Allow fallback to root properties if details is missing/incomplete
  };

  if (combinedDetails.kitchen) features.push({ label: 'Kitchen', key: 'kitchen' });
  if (combinedDetails.beds) features.push({ label: `${combinedDetails.beds} beds`, key: 'beds' });

  // Check for AC in various forms
  if (combinedDetails.airConditioner || combinedDetails.AC) features.push({ label: 'AC', key: 'AC' });

  if (combinedDetails.TV) features.push({ label: 'TV', key: 'TV' });
  if (combinedDetails.shower) features.push({ label: 'Shower', key: 'shower' });
  if (combinedDetails.bathroom && !combinedDetails.shower) features.push({ label: 'Bathroom', key: 'bathroom' });
  if (combinedDetails.radio) features.push({ label: 'Radio', key: 'radio' });
  if (combinedDetails.toilet) features.push({ label: 'Toilet', key: 'toilet' });
  if (combinedDetails.freezer) features.push({ label: 'Freezer', key: 'freezer' });
  if (combinedDetails.hob) features.push({ label: `${combinedDetails.hob} Hob`, key: 'hob' });
  if (combinedDetails.microwave) features.push({ label: 'Microwave', key: 'microwave' });
  if (combinedDetails.gas) features.push({ label: 'Gas', key: 'gas' });
  if (combinedDetails.water) features.push({ label: 'Water', key: 'water' });

  const displayFeatures = limit ? features.slice(0, limit) : features;

  return (
    <div className="flex flex-wrap gap-2">
      {displayFeatures.map((feature, idx) => (
        <span key={idx} className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-badge text-secondary text-base font-medium">
          {getIcon(feature.key)}
          <span className="capitalize">{feature.label || feature.key}</span>
        </span>
      ))}
    </div>
  );
};