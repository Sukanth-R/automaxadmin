import React, { useState } from "react";

const ZoomSidebar = () => {
  // State to manage the zoom level
  const [zoomLevel, setZoomLevel] = useState(100);

  // Function to handle zoom in
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200)); // Limit zoom to 200%
  };

  // Function to handle zoom out
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50)); // Limit zoom to 50%
  };

  return (
    <div className="fixed top-1/2 z-50 right-0 transform -translate-y-1/2 bg-white shadow-lg rounded-l-lg p-3 flex flex-col space-y-3">
      {/* Zoom In Button */}
      <button
        onClick={handleZoomIn}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Zoom In"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>

      {/* Zoom Out Button */}
      <button
        onClick={handleZoomOut}
        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Zoom Out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      {/* Display Current Zoom Level */}
      <div className="text-center text-gray-700 text-sm">
        {zoomLevel}%
      </div>
    </div>
  );
};

export default ZoomSidebar;