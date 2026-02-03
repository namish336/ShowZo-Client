
import { useState } from "react";
import { franchises } from "../data/franchises";


const WatchGuide = () => {
  const [selectedFranchise, setSelectedFranchise] = useState(null);

  return (
  
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 mt-[60px]">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🎬 Franchise Watch Guide
      </h1>
        <br></br>
      {/* Franchise Grid */}
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {franchises.map((franchise) => (
          <div
            key={franchise.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition transform duration-300 cursor-pointer"
            onClick={() => setSelectedFranchise(franchise)}
          >
            <img
              src={franchise.image}
              alt={franchise.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{franchise.name}</h2>
              <p className="text-sm text-gray-400 mt-2">
                {franchise.description}
              </p>
              <button className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm font-semibold">
                View Watch Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFranchise && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedFranchise(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {selectedFranchise.name} – Watch Order
            </h2>

            <ol className="list-decimal list-inside space-y-2">
              {selectedFranchise.watchOrder.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-700 px-4 py-2 rounded-lg"
                >
                  {item}
                </li>
              ))}
            </ol>

            <button
              className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
            >
              🎟 Book Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchGuide;
