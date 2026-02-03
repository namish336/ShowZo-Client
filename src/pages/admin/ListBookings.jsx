import React, { useEffect, useState } from 'react'
import { getAllBookings } from '../../services/api';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/dateFormat';
import { UserIcon, FilmIcon, CalendarIcon, ArmchairIcon, CreditCardIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        if (data.bookings) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return !loading ? (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title text1="List" text2="Bookings" />
          <p className="text-gray-400 text-sm mt-1">Viewing all user bookings</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-gray-300">
          Total Bookings: {bookings.length}
        </div>
      </div>

      <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-gray-400">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Movie</th>
                <th className="px-6 py-4">Show Details</th>
                <th className="px-6 py-4">Seats</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      {/* Assuming user details might not be populated in Booking model directly unless added. 
                            If userId is just an ID, we might need to fetch user, or just show ID. 
                            For now, let's show User ID or 'Guest' if not populated. 
                        */}
                      <span className="truncate max-w-[100px]" title={booking.userId}>{booking.userId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FilmIcon className="w-4 h-4 text-gray-500" />
                      {booking.showtime?.movie?.title || "Unknown Movie"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs">
                        <CalendarIcon className="w-3 h-3 text-gray-500" />
                        {dateFormat(booking.showtime?.showTime)}
                      </div>
                      <span className="text-xs text-gray-500">{booking.showtime?.theater?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ArmchairIcon className="w-4 h-4 text-gray-500" />
                      <span className="truncate max-w-[150px]">{booking.seats.join(", ")}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {currency} {booking.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${booking.isPaid
                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                      }`}>
                      {booking.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="p-10 text-center text-gray-500 flex flex-col items-center">
              <CreditCardIcon className="w-10 h-10 mb-3 opacity-20" />
              <p>No bookings found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default ListBookings