import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary font-semibold' : 'text-gray-900 hover:text-primary';
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-secondary">
          <Truck className="w-8 h-8 text-primary" />
          <span>TravelTrucks</span>
        </Link>
        <div className="flex gap-8">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/catalog" className={isActive('/catalog')}>Catalog</Link>
        </div>
      </div>
    </nav>
  );
};