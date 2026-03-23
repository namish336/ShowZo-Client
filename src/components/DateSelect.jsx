import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import BlurCircle from "./BlurCircle";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@clerk/clerk-react";

const DateSelect = ({ id }) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [selected, setSelected] = useState(null);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      const nextDates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        nextDates.push(date.toISOString());
      }
      setDates(nextDates);
    };
    generateDates();
  }, []);


  const onBookHandler = () => {
    if (!isSignedIn) {
      return toast.error("Please login to continue");
    }
    if (!selected) {
      return toast.error("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-white/40 backdrop-blur-md border border-white/60 shadow-lg rounded-2xl">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0" />
        <div>
          <p className="text-lg font-semibold">Choose Date</p>
          <div className="flex items-center gap-6 text-sm mt-5">
            <ChevronLeftIcon width={28} />
            <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
              {dates.map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer transition-colors font-medium ${selected === date
                      ? "bg-primary text-white shadow-md border border-primary"
                      : "border border-white/60 bg-white/30 hover:bg-white/50 text-gray-800"
                    }`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>
                    {new Date(date).toLocaleString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </span>
            <ChevronRightIcon width={28} />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="bg-primary text-white px-10 py-3 mt-6 rounded-full hover:bg-primary-dull transition-all cursor-pointer font-bold shadow-md"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;