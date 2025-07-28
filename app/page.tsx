'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import BookingForm, { BookingFormData } from './components/BookingForm';
import Link from 'next/link';

interface PetBoardingService {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const services: PetBoardingService[] = [
  {
    id: '1',
    name: 'Day Care',
    price: 30,
    description: 'Full day of supervised play and care in our spacious facility',
    image: '/images/daycare.jpg',
  },
  {
    id: '2',
    name: 'Overnight Stay',
    price: 50,
    description: 'Comfortable overnight boarding with care. We offer a variety of sizes and breeds.',
    image: '/images/overnight.jpg',
  },
  {
    id: '3',
    name: 'Grooming',
    price: 40,
    description: 'Full grooming service with bath and trim. We offer a variety of sizes and breeds.',
    image: '/images/grooming.jpg',
  },
  {
    id: '4',
    name: 'Pet Walking',
    price: 25,
    description: 'Individual or group walks with our experienced handlers. Regular exercise and outdoor time.',
    image: '/images/walking.jpg',
  }
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<PetBoardingService | null>(null);

  const handleBookNow = (service: PetBoardingService) => {
    setSelectedService(service);
  };

  const handleCloseBooking = () => {
    setSelectedService(null);
  };

  const handleSubmitBooking = (formData: BookingFormData) => {
    // Here you would typically send this data to your backend
    console.log('Booking submitted:', { service: selectedService, formData });
    
    // Show success message
    alert('Booking submitted successfully! We will contact you shortly.');
    
    // Close the form
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-blue-800">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">Welcome to FurLodge!</span>
                <span className="hidden md:inline">Welcome to FurLodge - Your trusted partner for premium pet care services!</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <Link
                href="/register"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Image Banner */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/images/banner.jpg"
            alt="Happy pets playing"
            fill
            style={{ objectFit: 'cover' }}
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/20" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-lg">
              FurLodge
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl drop-shadow-md">
              Find the perfect care for your furry friend
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/boarder"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                >
                  Book Now
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Professional Pet Care Services
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We provide a range of services to ensure your pet receives the best care possible.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Daycare */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Daycare</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Full-day care with playtime, socialization, and supervised activities.
                  </p>
                </div>
              </div>

              {/* Overnight Boarding */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Overnight Boarding</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Comfortable overnight stays with 24/7 supervision and care.
                  </p>
                </div>
              </div>

              {/* Pet Walking */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Pet Walking</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Regular exercise and outdoor time with experienced handlers.
                  </p>
                </div>
              </div>

              {/* Grooming */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Grooming</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Professional grooming services to keep your pet looking and feeling great.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-600">Book your pet's care today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/boarder"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority={service.id === '1'}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-blue-500 text-lg mb-3">
                  ${service.price}/day
                </p>
                <p className="text-gray-600">
                  {service.description}
                </p>
                <button 
                  onClick={() => handleBookNow(service)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form Modal */}
      {selectedService && (
        <BookingForm
          serviceName={selectedService.name}
          price={selectedService.price}
          onClose={handleCloseBooking}
          onSubmit={handleSubmitBooking}
        />
      )}
    </div>
  );
}
