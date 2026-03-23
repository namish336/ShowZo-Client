import React, { useEffect, useState } from 'react'
import { getAllShowtimes, deleteShow, deleteShowtimes } from '../../services/api';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/dateFormat';
import { Trash2Icon, ClockIcon, MapPinIcon, TicketIcon, CheckSquareIcon, SquareIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShows, setSelectedShows] = useState([]);

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

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedShows.length} selected shows?`)) {
      try {
        const result = await deleteShowtimes(selectedShows);
        if (result.success) {
          toast.success(result.message || "Shows deleted successfully");
          setSelectedShows([]);
          fetchShows();
        } else {
          toast.error(result.message || "Failed to delete shows");
        }
      } catch (error) {
        toast.error("Error deleting shows");
      }
    }
  };

  const toggleSelect = (id) => {
    setSelectedShows(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedShows.length === shows.length && shows.length > 0) {
      setSelectedShows([]);
    } else {
      setSelectedShows(shows.map(show => show._id));
    }
  };

  return !loading ? (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Title text1="List" text2="Shows" />
          <p className="text-gray-400 text-sm mt-1">Viewing all scheduled showtimes</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedShows.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Trash2Icon className="w-3 h-3" />
              Delete Selected ({selectedShows.length})
            </button>
          )}
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-gray-300">
            Total Shows: {shows.length}
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/5 text-xs uppercase font-semibold text-gray-400">
              <tr>
                <th className="px-6 py-4 w-10">
                  <button onClick={handleSelectAll} className="hover:text-white transition-colors">
                    {selectedShows.length === shows.length && shows.length > 0 ? (
                      <CheckSquareIcon className="w-4 h-4 text-primary" />
                    ) : (
                      <SquareIcon className="w-4 h-4" />
                    )}
                  </button>
                </th>
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
                  className={`transition-colors group ${selectedShows.includes(show._id) ? 'bg-primary/5' : 'hover:bg-white/5'}`}
                >
                  <td className="px-6 py-4">
                    <button onClick={() => toggleSelect(show._id)} className="hover:text-white transition-colors">
                      {selectedShows.includes(show._id) ? (
                        <CheckSquareIcon className="w-4 h-4 text-primary" />
                      ) : (
                        <SquareIcon className="w-4 h-4" />
                      )}
                    </button>
                  </td>
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