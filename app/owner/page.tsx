'use client';

import { useState } from 'react';
import Image from 'next/image';
import BookingForm, { BookingFormData } from '../components/BookingForm';

interface PetBoardingService {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const services: PetBoardingService[] = [
  {
    id: 'daycare',
    name: 'Daycare',
    description: 'Full-day care with playtime, socialization, and supervised activities. Perfect for busy pet parents who need daytime care for their pets.',
    price: 35,
    image: '/images/daycare.jpg'
  },
  {
    id: 'overnight',
    name: 'Overnight Boarding',
    description: 'Comfortable overnight stay with 24/7 supervision, regular feeding, and evening walks. Your pet will feel right at home in our cozy facilities.',
    price: 50,
    image: '/images/overnight.jpg'
  },
  {
    id: 'walking',
    name: 'Pet Walking',
    description: 'Individual or group walks with our experienced handlers. Regular exercise and outdoor time to keep your pet happy and healthy.',
    price: 25,
    image: '/images/walking.jpg'
  }
];

export default function OwnerPage() {
  const [selectedService, setSelectedService] = useState<PetBoardingService | null>(null);

  const handleBookingSubmit = async (formData: BookingFormData) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Booking confirmed! Check your email for confirmation details.');
        setSelectedService(null);
      } else {
        alert('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Pet Services
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Choose from our range of professional pet care services
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${service.price}/day</span>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      {selectedService && (
        <BookingForm
          serviceName={selectedService.name}
          price={selectedService.price}
          onClose={() => setSelectedService(null)}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
} 