import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const isProductsPage = window.location.pathname === "/products";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setMobileOpen(false); // close dropdown on mobile
    }
  };

  return (
    <div className="relative w-full max-w-2xl px-4">
      {/* Desktop Search Bar */}
      <div
        className={`hidden md:flex  rounded-md px-3 py-2 items-center sm:w-[200px] md:w-[400px] lg:w-[600px] ${
          isProductsPage ? "bg-white text-black" : " bg-blue-100 text-black  "
        }`}
      >
        <form onSubmit={handleSearch} className="flex flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for Products, Brands and More..."
            className="bg-transparent w-full outline-none text-sm"
          />
          <button type="submit" className="flex items-center gap-2">
            <Search size={22} />
          </button>
        </form>
      </div>

      {/* Mobile Search Icon */}
      <div className="flex md:hidden items-center">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Search size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Search Input */}
      {mobileOpen && (
        <div className="absolute top-10 -left-77 right-0 bg-white rounded-md px-3 py-2 shadow-md md:hidden z-50 mt-2">
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for Products, Brands and More..."
              className="bg-transparent w-full outline-none text-sm"
              autoFocus
            />
            <button type="submit" className="ml-2">
              <Search size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
