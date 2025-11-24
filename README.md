# Travel Trucks - Camper Rental Web Application

A modern React-based web application for browsing and booking campervans. Built with Vite, Redux, and Tailwind CSS.

## Features

- **Browse Campers**: View available campervans with detailed information
- **Advanced Filtering**: Filter by location, vehicle type, and equipment
- **Favorites**: Save favorite campers (persisted in localStorage)
- **Detailed Views**: Comprehensive camper details with photo gallery and reviews
- **Booking System**: Book campers with a simple form
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

## API

Uses MockAPI for camper data: `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Okan-ozdemir/travel-trucks.git
   cd travel-trucks
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Build for Production

```bash
npm run build
```

## Deployment

Deployed on Vercel: https://travel-trucks-omega-sandy.vercel.app

Ready for deployment on Vercel, Netlify, or any static hosting service.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API services
├── store/         # Redux store and slices
└── utils/         # Helper functions
```

## Author

Okan Özdemir
