import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LogOut, HandCoins, Shuffle, ArrowLeftRight, UserRound, 
  MapPin, CreditCard, Ticket, Bell, Gift, FileText 
} from 'lucide-react';

const AccSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To highlight active tab

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  // Helper component for menu items
  const MenuItem = ({ icon: Icon, label, path, isHeader = false }) => {
    if (isHeader) {
      return (
        <div className="px-4 mt-6 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </div>
      );
    }

    const isActive = location.pathname === path;
    return (
      <div
        onClick={() => navigate(path)}
        className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl cursor-pointer transition-all duration-200 
          ${isActive 
            ? "bg-blue-50 text-blue-600 font-semibold" 
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
      >
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </div>
    );
  };

  return (
    <aside className="w-80 bg-white min-h-screen rounded-2xl border-r border-gray-100 flex flex-col">
      
      {/* Profile Header */}
      <div className="p-6 flex items-center gap-4 border-b border-gray-100">
        <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
          👤
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium">Welcome back,</p>
          <h2 className="text-lg font-bold text-gray-800">User Name</h2>
        </div>
      </div>

      {/* Navigation Scroll Area */}
      <nav className="flex-1 py-4 overflow-y-auto">
        
        <MenuItem isHeader label="Orders" />
        <MenuItem icon={ArrowLeftRight} label="My Orders" path="/account/orders" />

        <MenuItem isHeader label="Account Settings" />
        <MenuItem icon={UserRound} label="Personal Information" path="/account/personalInfo" />
        <MenuItem icon={MapPin} label="Manage Addresses" path="/account/manageaddress" />
        <MenuItem icon={FileText} label="PAN Card Information" path="/account/pan_info" />

        <MenuItem isHeader label="Payments" />
        <MenuItem icon={Gift} label="Gift Cards" path="/account/giftcards" />
        <MenuItem icon={HandCoins} label="Saved UPI" path="/account/upis" />
        <MenuItem icon={CreditCard} label="Saved Cards" path="/account/cards" />

        <MenuItem isHeader label="My Stuff" />
        <MenuItem icon={Ticket} label="My Coupons" path="/account/coupons" />
        <MenuItem icon={Shuffle} label="My Reviews & Ratings" path="/account/review&rating" />
        <MenuItem icon={Bell} label="Notifications" path="/account/notification" />
        <MenuItem icon={UserRound} label="My Wishlist" path="/account/wishlist" />

      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full py-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AccSideBar;