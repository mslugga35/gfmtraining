'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, Mail, Check, X, Loader2, RefreshCw } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId: string, newStatus: string) => {
    setUpdating(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setBookings(bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus as any }
            : booking
        ));
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gray-50 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-black">Booking Management</h1>
            <div className="flex items-center gap-4">
              <UserButton afterSignOutUrl="/" />
              <button
                onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 rounded-lg transition-colors text-black border border-gray-300"
            >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No bookings yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white border-b-2 border-gray-300">
                  <tr>
                    <th className="text-left p-4 text-black font-bold">Date/Time</th>
                    <th className="text-left p-4 text-black font-bold">Customer</th>
                    <th className="text-left p-4 text-black font-bold">Service</th>
                    <th className="text-left p-4 text-black font-bold">Contact</th>
                    <th className="text-left p-4 text-black font-bold">Status</th>
                    <th className="text-left p-4 text-black font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-white bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-600" />
                          <div>
                            <div className="font-medium text-black">
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="text-sm text-gray-700">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-black">{booking.name}</div>
                        {booking.notes && (
                          <div className="text-sm text-gray-700 mt-1">
                            {booking.notes}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-black">{booking.service}</div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-black">
                            <Phone className="w-3 h-3 text-gray-600" />
                            <a href={`tel:${booking.phone}`} className="hover:text-red-600 text-black">
                              {booking.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-black">
                            <Mail className="w-3 h-3 text-gray-600" />
                            <a href={`mailto:${booking.email}`} className="hover:text-red-600 text-black">
                              {booking.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {booking.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => updateStatus(booking.id, 'CONFIRMED')}
                                disabled={updating === booking.id}
                                className="p-2 bg-green-100 hover:bg-green-200 rounded-lg text-green-700 transition-colors disabled:opacity-50"
                                title="Confirm"
                              >
                                {updating === booking.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Check className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => updateStatus(booking.id, 'CANCELLED')}
                                disabled={updating === booking.id}
                                className="p-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-colors disabled:opacity-50"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {booking.status === 'CONFIRMED' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'COMPLETED')}
                              disabled={updating === booking.id}
                              className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 text-sm transition-colors disabled:opacity-50"
                            >
                              {updating === booking.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                'Mark Complete'
                              )}
                            </button>
                          )}
                          {booking.status === 'CANCELLED' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'PENDING')}
                              disabled={updating === booking.id}
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm transition-colors disabled:opacity-50"
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}