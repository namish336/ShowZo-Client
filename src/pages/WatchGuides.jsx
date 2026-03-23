
import { useState } from "react";
import { franchises } from "../data/franchises";


const WatchGuide = () => {
  const [selectedFranchise, setSelectedFranchise] = useState(null);

  return (
  
    <div className="min-h-screen bg-[#C0C9DB] text-gray-900 px-6 pt-24 pb-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🎬 Franchise Watch Guide
      </h1>
        <br></br>
      {/* Franchise Grid */}
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {franchises.map((franchise) => (
          <div
            key={franchise.id}
            className="bg-white/50 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition transform duration-300 cursor-pointer"
            onClick={() => setSelectedFranchise(franchise)}
          >
            <img
              src={franchise.image}
              alt={franchise.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{franchise.name}</h2>
              <p className="text-sm text-gray-700 font-medium mt-2">
                {franchise.description}
              </p>
              <button className="mt-4 w-full bg-red-600 text-white hover:bg-red-700 py-2 rounded-xl text-sm font-bold shadow-md shadow-red-500/20 transition-colors">
                View Watch Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFranchise && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 text-gray-900 border border-white/50 shadow-2xl rounded-2xl w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setSelectedFranchise(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl"
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
                  className="bg-[#C0C9DB]/40 border border-[#C0C9DB] px-4 py-3 rounded-xl font-medium shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchGuide;
