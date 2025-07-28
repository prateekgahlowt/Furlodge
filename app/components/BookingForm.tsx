import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  serviceName: string;
  price: number;
  onClose: () => void;
  onSubmit: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  petName: string;
  breed: string;
  ownerName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  specialNotes: string;
  totalPrice?: number;
  numberOfDays?: number;
}

export default function BookingForm({ serviceName, price, onClose, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    petName: '',
    breed: '',
    ownerName: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    specialNotes: '',
  });

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Calculate total price and number of days when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      if (diffDays > 0) {
        setNumberOfDays(diffDays);
        setTotalPrice(diffDays * price);
      }
    }
  }, [formData.startDate, formData.endDate, price]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    // Validate dates
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('End date must be after start date');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceName,
          totalPrice,
          numberOfDays,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      setSuccessMessage('Booking created successfully! Check your email for confirmation.');
      
      // Call the onSubmit prop with the booking data
      onSubmit({
        ...formData,
        totalPrice,
        numberOfDays,
      });

      // Close the form after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);

      // Redirect based on user role
      if (data.user.role === 'boarder') {
        router.push('/boarder');
      } else {
        router.push('/owner');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear any previous error messages when the user starts typing
    setError(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Book {serviceName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pet Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-black">Pet Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Pet's Name</label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Owner's Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-black">Booking Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today}
                  required
                  disabled={isLoading}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || today}
                  required
                  disabled={isLoading}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Special Notes</label>
                <textarea
                  name="specialNotes"
                  value={formData.specialNotes}
                  onChange={handleChange}
                  disabled={isLoading}
                  rows={3}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Any special requirements or information we should know about your pet?"
                />
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="mt-6 pt-4 border-t">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-black">Booking Summary</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Service: {serviceName}</p>
                <p className="text-gray-600">Rate: ${price}/day</p>
                {numberOfDays > 0 && (
                  <p className="text-gray-600">Duration: {numberOfDays} days</p>
                )}
                {totalPrice > 0 && (
                  <p className="text-lg font-semibold text-blue-600">
                    Total Price: ${totalPrice}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-4 bg-blue-500 text-white py-3 px-4 rounded-md transition-colors duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 