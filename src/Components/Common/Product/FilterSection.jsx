import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

const FilterSection = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    artist: "",
    price: "",
    style: "",
  });

  const [showTray, setShowTray] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const cleared = {
      category: "",
      artist: "",
      price: "",
      style: "",
    };
    setSelectedFilters(cleared);
    onFilterChange(cleared);
  };

  const FilterFields = () => (
    <>
      {[
        {
          name: "category",
          label: "Category",
          options: ["Landscape", "Portrait", "Abstract"],
        },
        {
          name: "artist",
          label: "Artist",
          options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
        },
        {
          name: "style",
          label: "Style",
          options: ["Impressionism", "Renaissance", "Modern Art"],
        },
        {
          name: "price",
          label: "Price",
          options: ["Under ₹500", "₹500 – ₹2000", "Above ₹2000"],
        },
      ].map((filter) => (
        <div key={filter.name} className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            {filter.label}
          </label>
          <select
            name={filter.name}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={selectedFilters[filter.name]}
            onChange={handleChange}
          >
            <option value="">All</option>
            {filter.options.map((opt, i) => (
              <option key={i} value={opt.toLowerCase().replace(/\s+/g, "-")}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Filter toggle button for all screen sizes */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowTray(true)}
          className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
          aria-label="Show filters"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      {/* Filter Tray (bottom sheet) for desktop and mobile */}
      <AnimatePresence>
        {showTray && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTray(false)}
              className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
            />

            {/* Bottom Sheet Tray */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-t-3xl p-6 z-50 max-h-[85vh] overflow-y-auto shadow-2xl w-full max-w-md"
            >
              {/* Drag Handle */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowTray(false)}
                  className="text-gray-500 text-sm hover:text-red-500"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>

              {FilterFields()}

              <div className="flex justify-between items-center mt-6">
                <button
                  className="text-gray-600 text-sm font-medium underline"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowTray(false)}
                  className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-sm hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSection;
