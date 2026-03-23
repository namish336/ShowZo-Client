import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { getMovieById, getAllShowtimes, createBooking, getOccupiedSeats } from '../services/api'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'

const SeatLayout = () => {

  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];


  const { id, date } = useParams()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null); // New state for theater filter
  const [show, setShow] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]); // REMOVE default useState([]) from below
  const navigate = useNavigate()
  const { getToken } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await getMovieById(id);
        const shows = await getAllShowtimes({ movie: id, date });

        if (movie) {
          setShow({ movie });
          setShowtimes(shows);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
        toast.error("Failed to load details");
      }
    };
    fetchData();
  }, [id, date]);

  // Fetch occupied seats when selectedTime changes
  useEffect(() => {
    const fetchOccupied = async () => {
      if (selectedTime) {
        const seats = await getOccupiedSeats(selectedTime);
        setOccupiedSeats(seats);
      } else {
        setOccupiedSeats([]);
      }
    }
    fetchOccupied();
  }, [selectedTime]);

  // Derive unique theaters from showtimes
  const uniqueTheaters = React.useMemo(() => {
    const theatersMap = new Map();
    showtimes.forEach(show => {
      if (show.theater) {
        theatersMap.set(show.theater._id, show.theater);
      }
    });
    return Array.from(theatersMap.values());
  }, [showtimes]);

  const [searchParams] = useSearchParams();

  // Set default theater and time based on params or default to first
  useEffect(() => {
    if (uniqueTheaters.length > 0) {
      const theaterParam = searchParams.get('theaterId');
      const showParam = searchParams.get('showId');

      if (theaterParam && uniqueTheaters.some(t => t._id === theaterParam)) {
        setSelectedTheater(theaterParam);
        // Only set time if theater matches
        if (showParam) {
          setSelectedTime(showParam);
        }
      } else if (!selectedTheater) {
        setSelectedTheater(uniqueTheaters[0]._id);
      }
    }
  }, [uniqueTheaters, searchParams]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast.error("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast.error("You can only select 5 seats");
    }
    if (occupiedSeats.includes(seatId)) {
      return toast.error("This seat is already booked");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              disabled={occupiedSeats.includes(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer flex items-center justify-center font-bold bg-white/40 hover:bg-white/80 shadow-sm 
                ${selectedSeats.includes(seatId) ? "bg-primary text-white border-primary shadow-lg" : ""}
                ${occupiedSeats.includes(seatId) ? "bg-gray-400/50 cursor-not-allowed border-gray-400 text-gray-700" : ""}
                `}
            >
              {occupiedSeats.includes(seatId) ? "X" : seatId}
            </button>
          );
        })}
      </div>
    </div>
  )

  const filteredShowtimes = showtimes.filter(item => item.theater && item.theater._id === selectedTheater);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 bg-[#C0C9DB] text-gray-900 min-h-screen relative">
      {/* Available Timings */}
      <div className="w-60 bg-white/50 backdrop-blur-md shadow-sm border border-white/40 rounded-lg py-6 h-max md:sticky md:top-30">
        <p className="text-lg font-bold px-6 mb-4">Select Theater</p>

        {/* Theater List */}
        <div className="px-6 mb-6 flex flex-col gap-2">
          {uniqueTheaters.map(theater => (
            <button
              key={theater._id}
              onClick={() => {
                setSelectedTheater(theater._id);
                setSelectedTime(null); // Reset time when theater changes
                setSelectedSeats([]); // Reset seats
              }}
              className={`text-left text-sm py-2 px-3 rounded-md transition-colors ${selectedTheater === theater._id
                ? "bg-primary text-white font-bold shadow-md"
                : "text-gray-600 font-medium hover:bg-white/50 hover:text-gray-900"
                }`}
            >
              <div>
                <p className="font-semibold">{theater.name}</p>
                <p className="text-xs opacity-70 truncate text-gray-700">{theater.location}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="h-px bg-white/60 mx-6 mb-6"></div>

        <p className="text-sm font-bold px-6 text-gray-700 mb-3">Available Timings</p>
        <div className="space-y-1">
          {filteredShowtimes.length > 0 ? (
            filteredShowtimes.map((item) => {
              const timeString = new Date(item.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedTime(item._id);
                    setSelectedSeats([]);
                  }}
                  className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime === item._id
                    ? "text-primary font-bold border-l-4 border-primary bg-white/80 shadow-sm"
                    : "text-gray-700 font-medium hover:text-gray-900 hover:bg-white/50"
                    }`}
                >
                  <ClockIcon className="w-4 h-4" />
                  <p className="text-sm">{timeString}</p>
                </div>
              );
            })
          ) : (
            <p className="px-6 text-xs text-gray-600 font-medium italic">No shows available for this theater.</p>
          )}
        </div>
      </div>
      {/* Seats Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-600 font-bold text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-900">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>{group.map((row) => renderSeats(row))}</div>
            ))}
          </div>
        </div>
        <button onClick={async () => {
          if (!selectedTime) {
            return toast.error("Please select a showtime");
          }
          if (selectedSeats.length === 0) {
            return toast.error("Please select at least one seat");
          }

          const loadingToast = toast.loading("Processing booking...");
          try {
            const bookingData = {
              showtimeId: selectedTime,
              seats: selectedSeats
            };

            const token = await getToken();
            const response = await createBooking(bookingData, token);

            if (response.success) {
              toast.dismiss(loadingToast);
              toast.success("Booking created! Please complete payment.");
              navigate(`/booking/payment/${response.booking._id}`);
            } else {
              toast.dismiss(loadingToast);
              toast.error(response.message || "Booking failed");
            }
          } catch (error) {
            toast.dismiss(loadingToast);
            toast.error("An error occurred");
          }
        }} className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95">
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
        </button>
      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout