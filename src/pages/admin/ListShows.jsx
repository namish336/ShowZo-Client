import React, { useEffect, useState } from 'react'
import { getAllShowtimes, deleteShow } from '../../services/api';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/dateFormat';
import { Trash2Icon, ClockIcon, MapPinIcon, TicketIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const data = await getAllShowtimes();
      setShows(data);
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to load shows");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      try {
        const result = await deleteShow(id);
        if (result.success) {
          toast.success("Show deleted successfully");
          fetchShows();
        } else {
          toast.error(result.message || "Failed to delete show");
        }
      } catch (error) {
        toast.error("Error deleting show");
      }
    }
  };

  return !loading ? (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Title text1="List" text2="Shows" />
          <p className="text-gray-400 text-sm mt-1">Viewing all scheduled showtimes</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-gray-300">
          Total Shows: {shows.length}
        </div>
      </div>

      <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-gray-400">
              <tr>
                <th className="px-6 py-4">Movie</th>
                <th className="px-6 py-4">Theater</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {shows.map((show, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                      <TicketIcon className="w-4 h-4" />
                    </span>
                    {show.movie ? show.movie.title : "Unknown Movie"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-4 h-4 text-gray-500" />
                      {show.theater ? show.theater.name : "Unknown Theater"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-gray-500" />
                      {dateFormat(show.showTime)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {currency} {show.price}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(show._id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2Icon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {shows.length === 0 && (
            <div className="p-10 text-center text-gray-500">No shows found.</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default ListShows