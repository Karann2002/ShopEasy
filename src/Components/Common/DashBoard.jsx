import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  Smartphone, 
  Monitor, 
  Armchair, 
  Plane, 
  Bike, 
  Gamepad2, 
  Shirt,
  ShoppingBag,
  Watch,
  Camera,
  Printer,
  Speaker
} from "lucide-react";
import Banner from "../Others/Banner"; // Assuming you have this component

// --- DATA ARRAYS (Kept exactly as you provided) ---
const Electronics = [
  { id: 1, image: "Electronics/-original-imah3zvdthupfejc.webp", title: "Best Truewireless Handset", price: "Grab Now!", category: "Headphones & Headsets" },
  { id: 2, image: "Electronics/-original-imagb54tb6fpurze.webp", title: "Noise SmartWatches", price: "From ₹1,299", category: "smart watches" },
  { id: 3, image: "Electronics/-original-imagxrhetgfuebnn.webp", title: "Fastrack SmartWatches ", price: "From ₹1,099", category: "Fastrack" },
  { id: 4, image: "Electronics/philips-s1121-45-s1121-45-original-imafry2qgxcwnm9r.webp", title: "Best For Savers", price: "From ₹1,649", category: "trimmers" },
  { id: 5, image: "Electronics/-original-imafkykednshkhx5.webp", title: "Printers", price: "From 2,000", category: "printer" },
  { id: 6, image: "Electronics/srs-xb23-sony-original-imaftk66vjxp86h5.webp", title: "Best Selling Mobile Speaker", price: "From ₹1,199", category: "Bluetooth Speakers" },
  { id: 7, image: "Electronics/zeb-pixaplay-63-zeb-mlp-7-13-05-zeb-pixaplay-63-zeb-mlp-7-led-original-imah8r9fgjfs27jh.webp", title: "ASUS Monitors", price: "From ₹5,199", category: "monitors" },
  { id: 8, image: "Electronics/kids-camera-mini-rechargeable-and-shockproof-camera-creative-diy-original-imag5h7gdjzrvzdr.webp", title: "Top Mirror Camera", price: "Shop Now", category: "camera" },
  { id: 9, image: "Electronics/-original-imah9hc5md7furca.webp", title: "Monitors", price: "From ₹10,199", category: "monitors" },
];

const ToysnBeauty = [
  { id: 1, image: "Beauty&Toys/-original-imagbwf3wvhzfh5z.webp", title: "Coffe Powder", price: "Up to 80% Off", category: "" },
  { id: 2, image: "Beauty&Toys/4-function-remote-control-high-speed-big-racing-car-toy-funkey-original-imafkg33umd8dy93.webp", title: "Remote Control Cars", price: "Upto 80% Off", category: "" },
  { id: 3, image: "Beauty&Toys/xc-900-grey-lite-26-15-5-cradiac-21-gear-120-original-imagczuzpxeweczm.webp", title: "Geared Cycles ", price: "Upto 70% Off", category: "" },
  { id: 4, image: "Beauty&Toys/3-30155-mcfarlane-2-5-original-imagbeyyzehpyk2m.webp", title: "Best For Action Toys", price: "Upto 70% Off", category: "" },
  { id: 5, image: "Beauty&Toys/push-up-bar-0-8-long-ankaro-original-imafu9dmvdk3rzvy.webp", title: "Gym Essentials", price: "From ₹139", category: "Home Gyms " },
  { id: 6, image: "Beauty&Toys/4-feet-pink-very-beautiful-best-quality-for-special-gift-125-13-original-imafgv92puzkdytg.webp", title: "Soft Toys", price: "Upto 70% Off", category: "" },
  { id: 7, image: "Beauty&Toys/-original-imagfykthgudy4qz.webp", title: "Electric Cylces", price: "Upto 40% Off", category: "" },
  { id: 8, image: "Beauty&Toys/200-100-natural-california-pouch-happilo-original-imafzvw2tcazeur6.webp", title: "Dry Fruits", price: "Upto 45% Off", category: "Nuts and Dry Fruits" },
];

const SportnHealthcare = [
  { id: 1, image: "/Sports&Healthcare/200-100-natural-california-pouch-happilo-original-imafzvw2tcazeur6 (1).webp", title: "Dry Fruits", price: "Upto 75% Off", category: "Nuts and Dry Fruits" },
  { id: 2, image: "/Sports&Healthcare/510-chocolate-peanut-butter-crunchy-510g-jar-nut-butter-original-imagyzpqqfaguxny.webp", title: "Food Spreads", price: "Upto 75% Off", category: "" },
  { id: 3, image: "/Sports&Healthcare/push-up-bar-0-8-long-ankaro-original-imafu9dmvdk3rzvy.webp", title: "Gym Essentials", price: "From ₹139", category: "Home Gyms" },
  { id: 4, image: "/Sports&Healthcare/anadi-01-yoga-mat-4-30-anadi-enterprise-15-original-imagfsxudxcm7r48.webp", title: "Yoga Mat", price: "From ₹159", category: "Exercise Fitness " },
  { id: 5, image: "/Sports&Healthcare/60-wooden-earth-jigsaw-puzzle-60-pcs-webby-original-imagyc8hsdztzdzb.webp", title: "Puzzle & Cubes", price: "From ₹79", category: "" },
  { id: 6, image: "Sports&Healthcare/4-feet-pink-very-beautiful-best-quality-for-special-gift-125-13-original-imafgv92puzkdytg.webp", title: "Soft Toys", price: "Upto 70% Off", category: "" },
  { id: 7, image: "/Sports&Healthcare/1-oats-veggies-masala-oats-pouch-yogabar-original-imag5suhzvwy3xh4.webp", title: "Breakfast Cereal", price: "Upto 75% Off", category: "Food Essentials" },
  { id: 8, image: "/Sports&Healthcare/premium-pouch-regular-tea-powder-tata-original-imafzuf2mnubzphd.webp", title: "Tea Powder", price: "Upto 75% Off", category: "" },
];

const Fashion = [
  { id: 1, image: "Fashion/6-art-100-judgement-grey-original-imah7p89xh6wsxsk (1).webp", title: "Men’s Slippers & Flip Flops", price: "Min. 70% Off", category: "Flip -Flops " },
  { id: 2, image: "Fashion/6-rng-854-grey-40-bruton-grey-original-imahb2e63hhyb3hp.webp", title: "Men's Casual Shoes", price: "Min. 70% Off", category: "Foot Wear" },
  { id: 3, image: "Fashion/l-spy-boxer-c26-rusksun-original-imah923zrmvvhsca.webp", title: "Men's Boxers", price: "Special Offer", category: "Shorts " },
  { id: 4, image: "Fashion/s-grey-red-tocayo-original-imah483g8wgqwjg7.webp", title: "Men's Vests", price: "Min. 50% Off", category: "Women's wear" },
];

// Reusable Components
const SectionHeader = ({ title }) => (
  <div className="flex justify-between items-end mb-4 px-1">
    <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
    <button className="hidden md:flex items-center gap-1 text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors">
      View All <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

const ProductCard = ({ item, navigate }) => (
  <div 
    onClick={() => navigate(`/products?category=${encodeURIComponent(item.category)}`)}
    className="group min-w-[200px] md:min-w-[240px] bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-xl hover:border-indigo-100 transition-all duration-300 ease-out snap-start"
  >
    <div className="relative w-full h-40 mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
      {/* Added onError to handle broken local image paths gracefully */}
      <img 
        src={item.image} 
        alt={item.title} 
        onError={(e) => {e.target.src = "https://placehold.co/200x200?text=No+Image"}}
        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" 
      />
    </div>
    <div className="space-y-1 text-center md:text-left">
      <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
        {item.title}
      </h3>
      <p className="text-lg font-bold text-gray-800">{item.price}</p>
    </div>
  </div>
);

const GridCard = ({ item, navigate }) => (
  <div 
    onClick={() => navigate(`/products?category=${encodeURIComponent(item.category)}`)}
    className="border border-gray-100 rounded-xl p-3 cursor-pointer hover:shadow-lg hover:border-indigo-200 transition-all bg-white"
  >
    <div className="relative group w-full h-[140px] mb-2 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
      <img 
        src={item.image} 
        alt={item.title} 
        onError={(e) => {e.target.src = "https://placehold.co/200x200?text=No+Image"}}
        className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" 
      />
    </div>
    <div className="text-left">
      <h3 className="text-xs md:text-sm font-medium text-gray-600 line-clamp-1">{item.title}</h3>
      <h5 className="font-bold text-indigo-600 text-sm md:text-base">{item.price}</h5>
    </div>
  </div>
);

const DashBoard = () => {
  const navigate = useNavigate();

  // Define categories for the top bar
  const categories = [
    { name: "Mobiles", icon: Smartphone, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Electronics", icon: Monitor, color: "text-purple-600", bg: "bg-purple-100" },
    { name: "Fashion", icon: Shirt, color: "text-pink-600", bg: "bg-pink-100" },
    { name: "Home", icon: Armchair, color: "text-orange-600", bg: "bg-orange-100" },
    { name: "Appliances", icon: ShoppingBag, color: "text-green-600", bg: "bg-green-100" },
    { name: "Travel", icon: Plane, color: "text-sky-600", bg: "bg-sky-100" },
    { name: "Beauty", icon: ShoppingBag, color: "text-rose-600", bg: "bg-rose-100" },
    { name: "Two Wheelers", icon: Bike, color: "text-gray-600", bg: "bg-gray-100" },
  ];

  return (
    // Main Container with padding-top to avoid overlap with fixed navbar
    <div className="bg-slate-50 min-h-screen pt-24 pb-12">
      
      {/* 1. Category Bar (Replaced messy <ul> with a clean flex container) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
          <div className="flex overflow-x-auto gap-6 md:gap-8 pb-2 justify-center no-scrollbar scroll-smooth items-center">
            {categories.map((cat, index) => (
              <div key={index} className="flex flex-col items-center p-2 min-w-[72px] cursor-pointer group">
                <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <cat.icon className={`w-7 h-7 ${cat.color}`} />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-indigo-600 whitespace-nowrap">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Banner Section */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
           {/* If Banner component isn't responsive, wrap it or style it here */}
           <Banner /> 
        </div>
      </div>

      {/* 3. Horizontal Product Sliders */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mb-12">
        {[
          { title: "Best in Electronics", data: Electronics },
          { title: "Beauty, Food, Toys & More", data: ToysnBeauty },
          { title: "Sports, Healthcare & More", data: SportnHealthcare },
          { title: "Furniture Deals", data: Electronics }, // Reusing data as per your code
          { title: "Top Deals", data: SportnHealthcare }, // Reusing data as per your code
        ].map((section, index) => (
          <div key={index}>
            <SectionHeader title={section.title} />
            <div className="flex overflow-x-auto gap-4 pb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x snap-mandatory">
              {section.data.map((card) => (
                <ProductCard key={card.id} item={card} navigate={navigate} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 4. "Bento" Grid Section (Replaced the 3-column layout) */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Season's Top Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Fashion Top Deals", data: Fashion },
              { title: "Trending Gadgets", data: Fashion },
              { title: "Season's Top Picks", data: Fashion },
              { title: "Home Decor", data: Fashion },
              { title: "Beauty & Wellness", data: Fashion },
              { title: "Monsoon Must-Haves", data: Fashion },
            ].map((section, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-700">{section.title}</h3>
                  <button className="bg-indigo-600 text-white rounded-full p-1 hover:bg-indigo-700">
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                {/* 2x2 Grid inside the card */}
                <div className="grid grid-cols-2 gap-3">
                  {section.data.slice(0, 4).map((card) => (
                     <GridCard key={card.id} item={card} navigate={navigate} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashBoard;