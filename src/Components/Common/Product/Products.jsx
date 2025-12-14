import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

// Components
import Loading from "../../Others/Loading";
import FilterSection from "./FilterSection";
import AddToCartButton from "../Cart/AddToCartButton";
import AddToWishList from "../Wishlist/AddToWishList";

// Icons (Inline SVG for zero dependencies, or replace with lucide-react/heroicons)
const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const EmptyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
);

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")?.trim();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchWithAnyCategory = async () => {
      setLoading(true);
      try {
        // Note: For large datasets, fetching ALL docs and filtering client-side is expensive.
        // Consider using Firestore 'where' queries with 'array-contains' if possible in the future.
        const snapshot = await getDocs(collection(db, "addProduct"));

        const filtered = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => {
            if (!category) return true; // Show all if no category selected

            const c1 = item.category_1?.toLowerCase().trim();
            const c2 = item.category_2?.toLowerCase().trim();
            const c3 = item.category_3?.toLowerCase().trim();
            const cat = category.toLowerCase().trim();

            return c1 === cat || c2 === cat || c3 === cat;
          });

        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWithAnyCategory();
  }, [category]);

  // Prevent background scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileFilterOpen]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      
      {/* --- Page Header --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold capitalize text-gray-900">
            {category || "All Products"}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({products.length} items)
            </span>
          </h1>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 lg:hidden px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
          >
            <FilterIcon /> Filters
          </button>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- Sidebar (Filters) --- */}
          {/* Desktop: Sticky Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <FilterSection
                onFilterChange={(updatedFilters) => console.log(updatedFilters)}
              />
            </div>
          </aside>

          {/* Mobile: Drawer Overlay */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsMobileFilterOpen(false)}
              ></div>
              {/* Drawer Content */}
              <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <CloseIcon />
                  </button>
                </div>
                <FilterSection
                  onFilterChange={(updatedFilters) => console.log(updatedFilters)}
                />
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full mt-8 bg-black text-white py-3 rounded-lg font-medium"
                >
                  Show Results
                </button>
              </div>
            </div>
          )}

          {/* --- Main Content --- */}
          <main className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loading />
              </div>
            ) : products.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-dashed border-gray-300">
                <EmptyIcon />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500 max-w-sm">
                  We couldn't find any items matching "{category}". Try checking other categories.
                </p>
                <button onClick={() => window.history.back()} className="mt-6 text-indigo-600 hover:underline">
                  Clear Filters
                </button>
              </div>
            ) : (
              // Product Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Product Card ---
const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      
      {/* Floating Wishlist Button */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-full shadow-sm p-1 hover:bg-white transition-colors">
          <AddToWishList product={product} />
        </div>
      </div>

      {/* Image Area */}
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-t-xl cursor-pointer"
        onClick={() => window.open(`/products/${product.id}`, '_blank')}
      >
        <img
          src={product.image_links || product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = '/placeholder-product.png'; }}
        />
        {/* Quick Buy Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
           <button className="w-full bg-white text-gray-900 font-semibold py-2 rounded shadow-lg hover:bg-gray-50">
             Quick View
           </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
            {/* Optional: Add Brand Name here if available in data */}
            {/* <p className="text-xs text-gray-500 mb-1">Brand Name</p> */}
            <h3 
                className="font-medium text-gray-900 line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors"
                onClick={() => window.open(`/products/${product.id}`, '_blank')}
            >
            {product.title}
            </h3>
        </div>

        {/* Rating Row */}
        {product.product_rating && (
           <div className="flex items-center gap-1 mb-2">
             <span className="flex text-yellow-400 text-sm">★</span>
             <span className="text-xs text-gray-500 font-medium pt-0.5">{product.product_rating}</span>
           </div>
        )}

        <div className="mt-auto pt-2 flex items-end justify-between border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">
                {/* Calculate fake MRP if not provided, just for visual demo */}
                ₹{(parseInt(product.selling_price) * 1.2).toFixed(0)}
            </span>
            <span className="text-lg font-bold text-gray-900">
              ₹{product.selling_price}
            </span>
          </div>
          
          <div className="flex gap-2">
            {/* Custom Cart Button Wrapper to style the imported button if needed */}
            <div className="transform active:scale-95 transition-transform">
                <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* Mobile: Buy Now Button (Always Visible) */}
        <button className="lg:hidden w-full mt-3 bg-indigo-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Buy Now
        </button>
      </div>
    </div>
  );
};

export default Products;