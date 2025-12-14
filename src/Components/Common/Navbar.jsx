import React, { useState, useEffect } from "react";
import {
  User,
  ShoppingBag,
  ShoppingCart,
  Bell,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  LogOut,
  Tag,
  Package,
  Heart,
  Gift,
  Zap,
  Headset,
  Smartphone,
  Search
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase-config"; // Adjust path as needed
import { useAuth } from "../Auth/useAuth"; // Adjust path as needed
import SearchBar from "../Others/SearchBar"; // Adjust path as needed

const Navbar = () => {
  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  
  // Mobile Dropdown States
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

  // Hooks
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Firebase Listeners
  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");
    const cartUnsub = onSnapshot(cartRef, (snapshot) => {
      setNotificationCount(snapshot.docs.length);
    });

    const wishRef = collection(db, "users", user.uid, "wishlist");
    const wishUnsub = onSnapshot(wishRef, (snapshot) => {
      setWishlistCount(snapshot.docs.length);
    });

    return () => {
      cartUnsub();
      wishUnsub();
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    setMobileMenuOpen(false);
    navigate("/auth/login");
  };

  // Helper for Nav Items
  const NavIcon = ({ icon: Icon, count, onClick, label }) => (
    <button 
      onClick={onClick} 
      className="relative group p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
    >
      <Icon className="w-6 h-6 text-gray-700 group-hover:text-indigo-600" />
      {count > 0 && (
        <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white animate-pulse">
          {count}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled || location.pathname === "/products"
            ? "bg-white/90 backdrop-blur-md shadow-sm border-gray-200"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">
            
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src="/logo/ShopEasylogo.png"
                  alt="ShopEasy"
                  className="h-8 md:h-10 transition-transform group-hover:scale-105"
                />
                <span className="hidden lg:block font-bold text-xl text-indigo-900 tracking-tight">
                  ShopEasy
                </span>
              </Link>
            </div>

            {/* Center: Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-2xl px-8">
              <div className="w-full relative group">
                <SearchBar /> 
                {/* Note: Ensure your SearchBar component has w-full and styled inputs */}
              </div>
            </div>

            {/* Right: Icons & Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search Toggle for Mobile */}
              <button className="md:hidden p-2 text-gray-600">
                <Search className="w-6 h-6" />
              </button>

              {isLoggedIn ? (
                <>
                  <div className="hidden md:block relative group">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-50 text-gray-700 font-medium transition-colors">
                      <User className="w-5 h-5" />
                      <span>Account</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {/* Desktop Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                      <div className="py-2">
                        <Link to="/account" className="flex items-center px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                          <User className="w-4 h-4 mr-3 text-indigo-500" /> Profile
                        </Link>
                        <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                          <Package className="w-4 h-4 mr-3 text-indigo-500" /> Orders
                        </Link>
                        <Link to="/account/wishlist" className="flex items-center px-4 py-2 hover:bg-gray-50 text-sm text-gray-700">
                          <Heart className="w-4 h-4 mr-3 text-indigo-500" /> Wishlist
                          {wishlistCount > 0 && <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 hover:bg-red-50 text-sm text-red-600">
                          <LogOut className="w-4 h-4 mr-3" /> Logout
                        </button>
                      </div>
                    </div>
                  </div>

                  <NavIcon 
                    icon={ShoppingBag} 
                    count={notificationCount} 
                    onClick={() => navigate("/cart")} 
                    label="Cart" 
                  />
                  
                  <div className="hidden md:block">
                     <NavIcon icon={Bell} onClick={() => navigate("/notifications")} label="Notifications" />
                  </div>

                  <button 
                    onClick={() => navigate("/becomeSeller")}
                    className="hidden lg:flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Become Seller</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-3">
                   <button 
                    onClick={() => navigate("/auth/login")}
                    className="text-gray-700 font-medium hover:text-indigo-600 px-3 py-2"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={() => navigate("/auth/register")}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-700 transition-transform active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Panel */}
      <div className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-50/50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
            <span className="font-bold text-lg text-gray-800">ShopEasy</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="overflow-y-auto h-[calc(100vh-80px)] p-4 space-y-6">
          
          {isLoggedIn ? (
            <>
              {/* User Brief */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Welcome back,</p>
                  <p className="font-bold text-gray-800">User Profile</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {/* Categories Accordion */}
                <div>
                  <button 
                    onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <Tag className="w-5 h-5 text-gray-400" /> Categories
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${mobileCategoriesOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {mobileCategoriesOpen && (
                    <div className="pl-11 pr-2 py-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                      {[
                        { name: "Mobiles", icon: Smartphone },
                        { name: "Electronics", icon: Zap },
                        { name: "Fashion", icon: Tag },
                        { name: "Home", icon: Gift },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 text-sm text-gray-600 hover:text-indigo-600 cursor-pointer">
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                 {/* Account Accordion */}
                 <div>
                  <button 
                    onClick={() => setMobileAccountOpen(!mobileAccountOpen)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <User className="w-5 h-5 text-gray-400" /> My Account
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${mobileAccountOpen ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {mobileAccountOpen && (
                    <div className="pl-11 pr-2 py-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                      <Link to="/orders" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-sm text-gray-600">Orders</Link>
                      <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-2 text-sm text-gray-600">
                        Wishlist {wishlistCount > 0 && <span className="bg-red-100 text-red-600 px-2 rounded-full text-xs">{wishlistCount}</span>}
                      </Link>
                      <Link to="/coupons" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-sm text-gray-600">Coupons</Link>
                    </div>
                  )}
                </div>

                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                  <span className="flex items-center gap-3 font-medium">
                    <ShoppingBag className="w-5 h-5 text-gray-400" /> Cart
                  </span>
                  {notificationCount > 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{notificationCount}</span>}
                </Link>
                
                <Link to="/becomeSeller" onClick={() => setMobileMenuOpen(false)} className="flex items-center p-3 rounded-lg hover:bg-gray-50 text-gray-700">
                   <span className="flex items-center gap-3 font-medium">
                    <ShoppingCart className="w-5 h-5 text-gray-400" /> Become a Seller
                  </span>
                </Link>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3">
               <button 
                  onClick={() => { navigate("/auth/login"); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-xl border border-gray-200 font-bold text-gray-700"
                >
                  Log In
                </button>
                <button 
                  onClick={() => { navigate("/auth/register"); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200"
                >
                  Create Account
                </button>
            </div>
          )}

          {/* Bottom Support Section */}
          <div className="pt-6 pb-20">
             <h4 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Support</h4>
             <div className="space-y-1">
                <Link to="/support" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-600 text-sm">
                  <Headset className="w-5 h-5" /> Customer Care
                </Link>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;