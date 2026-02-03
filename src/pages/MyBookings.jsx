import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { getUserBookings, cancelBooking } from '../services/api';
import Loading from '../components/Loading';
import BlurCircle from '../components/BlurCircle';
import timeFormat from '../lib/timeFormat';
import { dateFormat } from '../lib/dateFormat';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../lib/imageUtils';
import toast from 'react-hot-toast';


const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { getToken } = useAuth()

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = await getToken();
      const data = await getUserBookings(token);
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      toast.error("Failed to fetch bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const token = await getToken();
        const result = await cancelBooking(id, token);
        if (result.success) {
          toast.success("Booking cancelled successfully");
          fetchBookings();
        } else {
          toast.error(result.message || "Failed to cancel booking");
        }
      } catch (error) {
        toast.error("Error cancelling booking");
      }
    }
  };


  return !isLoading ? (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]">
      <BlurCircle top="100px" left="100px" />
      <div>
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className="text-lg font-semibold mb-4">My Bookings</h1>

      {bookings.filter(item => item && item.showtime && item.showtime.movie).map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl">
          <div className="flex flex-col md:flex-row">
            <img src={getImageUrl(item.showtime.movie.poster_path)}
              alt=""
              className="md:max-w-45 aspect-video h-auto object-cover object-bottom rounded" />
            <div className="flex flex-col p-4">
              <p className="text-lg font-semibold">{item.showtime.movie.title}</p>
              <p className="text-gray-400 text-sm">
                {timeFormat(item.showtime.movie.runtime)}
              </p>
              <p className="text-gray-400 text-sm mt-auto">
                {item.showtime.theater ? item.showtime.theater.name : 'Theater info unavailable'} | {dateFormat(item.showtime.showTime)}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:items-end md:text-right justify-between p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.isPaid ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"}`}>
                {item.isPaid ? "Confirmed" : "Pending Payment"}
              </span>
              <p className="text-2xl font-semibold">
                {currency}
                {item.amount}
              </p>
            </div>

            {!item.isPaid && (
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => navigate(`/booking/payment/${item._id}`)}
                  className="bg-primary hover:bg-primary-dull px-6 py-2 text-sm rounded-full font-medium transition-all active:scale-95 shadow-lg shadow-primary/25"
                >
                  Pay Now
                </button>
                <button
                  onClick={() => handleCancel(item._id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 text-sm rounded-full font-medium transition-all active:scale-95 border border-red-500/20"
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="text-sm">
              <p>
                <span className="text-gray-400">Total Tickets:</span>{" "}
                {item.seats.length}
              </p>
              <p>
                <span className="text-gray-400">Seat Number:</span>{" "}
                {item.seats.join(", ")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : <Loading />
}

export default MyBookings