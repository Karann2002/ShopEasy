import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Filter, 
  ChevronDown, 
  Search,
  ArrowRight,
  SlidersHorizontal,
  Zap
} from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Fetch Logic (Same as before) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "addProduct"));
        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const lowerQuery = query.toLowerCase();
        const matched = products.filter((p) =>
          (p.category_1?.toLowerCase() || "").includes(lowerQuery) ||
          (p.category_2?.toLowerCase() || "").includes(lowerQuery) ||
          (p.category_3?.toLowerCase() || "").includes(lowerQuery) ||
          (p.title?.toLowerCase() || "").includes(lowerQuery)
        );
        
        setResults(matched);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setTimeout(() => setLoading(false), 500); 
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  // --- SUB-COMPONENTS ---

  // 1. Sidebar Filter Component (Visual Only)
  const FilterSidebar = () => (
    <div className="hidden lg:block w-64 flex-shrink-0 space-y-6 pr-6 border-r border-gray-200">
      <div>
        <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
        <div className="space-y-2 text-sm text-gray-600">
          {["Mobiles", "Laptops", "Fashion", "Electronics", "Home"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              {cat}
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
        <div className="space-y-2 text-sm text-gray-600">
          {["Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹10,000", "Over ₹10,000"].map((price) => (
             <label key={price} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
             <input type="radio" name="price" className="border-gray-300 text-indigo-600 focus:ring-indigo-500" />
             {price}
           </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-800 mb-3">Customer Ratings</h3>
        <div className="space-y-2 text-sm text-gray-600">
           {[4, 3, 2].map((rating) => (
             <div key={rating} className="flex items-center gap-2 cursor-pointer hover:text-indigo-600">
                <input type="checkbox" className="rounded border-gray-300" />
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < rating ? "fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <span>& Up</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  // 2. Mobile Filter Chips (Visible only on mobile/tablet)
  const MobileFilters = () => (
    <div className="lg:hidden flex overflow-x-auto gap-3 pb-4 no-scrollbar mb-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium whitespace-nowrap">
        <SlidersHorizontal className="w-4 h-4" /> Filters
      </button>
      {["Top Rated", "Price: Low to High", "New Arrivals", "On Sale"].map((f) => (
        <button key={f} className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-600 whitespace-nowrap hover:bg-gray-50">
          {f}
        </button>
      ))}
    </div>
  );

  // 3. Horizontal List Skeleton
  const ListSkeleton = () => (
    <div className="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 rounded-xl bg-white animate-pulse">
      <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg flex-shrink-0"></div>
      <div className="flex-1 space-y-3 py-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs / Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Home / Search / <span className="text-gray-900">{query}</span></p>
          <h1 className="text-2xl font-bold text-gray-900">Results for "{query}"</h1>
          <p className="text-sm text-gray-500">{results.length} items found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar (Desktop) */}
          <FilterSidebar />

          {/* Right Content */}
          <div className="flex-1">
            
            {/* Mobile Filter Chips */}
            <MobileFilters />

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => <ListSkeleton key={i} />)}
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((product) => (
                  <div 
                    key={product.id}
                    className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    {/* Image Section - Fixed width on Desktop, Full on Mobile */}
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center p-4">
                       <img
                        src={product.image_links}
                        alt={product.title}
                        onError={(e) => {e.target.src = "https://placehold.co/400?text=No+Image"}}
                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                      />
                      <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-gray-400 hover:text-red-500 shadow-sm border border-gray-100">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Content Section - Middle */}
                    <div className="flex-1 flex flex-col justify-start">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">
                          {product.category_1}
                        </span>
                      </div>
                      
                      <h3 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-indigo-600 transition-colors line-clamp-2"
                      >
                        {product.title}
                      </h3>

                      {/* Ratings */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold gap-1">
                          {product.product_rating || "4.2"} <Star className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-sm text-gray-500 font-medium">(1,234 Reviews)</span>
                      </div>

                      {/* Features / Desc (Optional - simulated) */}
                      <ul className="hidden sm:block text-sm text-gray-500 list-disc list-inside space-y-1 mb-4">
                         <li>High quality material build</li>
                         <li>1 Year Standard Warranty</li>
                         <li>Fast Delivery Available</li>
                      </ul>
                    </div>

                    {/* Price & Action Section - Right Side */}
                    <div className="w-full sm:w-48 flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end gap-2 sm:gap-1 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                      <div className="text-left sm:text-right">
                        <div className="text-2xl font-bold text-gray-900">₹{product.selling_price}</div>
                        <div className="text-sm text-gray-500 line-through">₹{parseInt(product.selling_price) * 1.5}</div>
                        <div className="text-xs text-green-600 font-bold">50% off</div>
                      </div>

                      <div className="flex flex-col gap-2 w-1/2 sm:w-full mt-0 sm:mt-4">
                         {/* Assured Badge */}
                         <div className="hidden sm:flex items-center justify-end gap-1 mb-2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Flipkart_Plus_Logo.png" alt="Plus" className="h-4 object-contain opacity-70 grayscale" />
                         </div>

                         <button 
                            onClick={() => navigate(`/product/${product.id}`)}
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                         >
                            View Details
                         </button>
                         <button className="w-full py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                            <ShoppingCart className="w-4 h-4" /> Add
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                   <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
                <p className="text-gray-500 mt-2">Try checking your spelling or use different keywords.</p>
                <button 
                   onClick={() => navigate("/")}
                   className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700"
                >
                  Browse Categories
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;