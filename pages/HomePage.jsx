import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button.jsx';

const HomePage = () => {
  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-secondary flex items-center overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-50"></div>
       <div className="container mx-auto px-4 relative z-10">
         <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
           Campers of your dreams
         </h1>
         <p className="text-xl md:text-2xl text-white mb-10 font-medium">
           You can find everything you want in our catalog
         </p>
         <Link to="/catalog">
           <Button size="lg">View Now</Button>
         </Link>
       </div>
    </div>
  );
};

export default HomePage;