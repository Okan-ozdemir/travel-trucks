import React, { useState } from 'react';
import { Button } from './Button.jsx';

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ type: 'success', text: 'Booking successful! We will contact you soon.' });
      // Reset form if needed, though strictly we can't easily access inputs here without refs or controlled inputs
      // For simplicity in this demo, we just show the message
      const form = e.target;
      form.reset();
    }, 1500);
  };

  return (
    <div className="border border-gray-100 rounded-lg p-6 shadow-sm bg-white">
      <h3 className="text-xl font-semibold text-secondary mb-2">Book your campervan now</h3>
      <p className="text-subtext mb-6 text-sm">Stay connected! We are always ready to help you.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            required
            type="text"
            placeholder="Name"
            className="w-full bg-input px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full bg-input px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <input
            required
            type="date"
            placeholder="Booking date"
            className="w-full bg-input px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-subtext"
          />
        </div>
        <div>
          <textarea
            placeholder="Comment"
            rows={4}
            className="w-full bg-input px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          ></textarea>
        </div>

        {message && (
           <div className={`text-sm text-center p-2 rounded ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
             {message.text}
           </div>
        )}

        <div className="pt-2">
          <Button type="submit" className="w-40" isLoading={isSubmitting}>Send</Button>
        </div>
      </form>
    </div>
  );
};