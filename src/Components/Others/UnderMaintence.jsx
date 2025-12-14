import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const UnderMaintenance = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 p-4">
      <img
        src="/Screenshot 2025-07-14 135703.png"
        alt="Under Maintenance"
        className="w-full    mb-8"
      />

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all duration-200"
      >
        <ChevronLeft size={18} />
        Go to Dashboard
      </button>
    </div>
  );
};

export default UnderMaintenance;
