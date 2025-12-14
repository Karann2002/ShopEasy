import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useAuth } from "../../Auth/useAuth";
import { toast } from "react-toastify";

const WishItem = ({ item }) => {
  const { user } = useAuth();

  const handleRemove = async () => {
    if (!user) return;
    try {
      const itemRef = doc(db, "users", user.uid, "wishlist", item.id);
      await deleteDoc(itemRef);
      toast.success("Removed");
    } catch (err) {
      console.error("Remove failed:", err);
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      
      {/* Image (Left Side) */}
      <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-white border border-gray-200 rounded-md overflow-hidden p-2">
        <img
          src={item.image_links || "/placeholder-product.png"}
          alt={item.title}
          className="w-full h-full object-contain"
          onError={(e) => { e.target.src = "/placeholder-product.png"; }}
        />
      </div>

      {/* Info (Middle) */}
      <div className="flex-1 w-full text-center sm:text-left space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-snug">
            {item.title}
        </h3>
        
        <div className="flex items-center justify-center sm:justify-start gap-3">
             <span className="text-xl font-bold text-gray-900">₹{item.selling_price}</span>
             {item.mrp && <span className="text-sm text-gray-400 line-through">₹{item.mrp}</span>}
        </div>
        
        {item.product_rating && (
            <div className="text-sm text-yellow-500">
                {"★".repeat(Math.round(item.product_rating))} <span className="text-gray-400">({item.product_rating})</span>
            </div>
        )}
      </div>

      {/* Actions (Right Side) */}
      <div className="flex flex-col w-full sm:w-auto gap-3 min-w-[140px]">
        <button 
            className="w-full bg-indigo-600 text-white text-sm font-medium py-2.5 px-4 rounded shadow-sm hover:bg-indigo-700 transition-colors"
        >
            Add to Cart
        </button>
        
        <button
            onClick={handleRemove}
            className="w-full text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center gap-1"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Remove
        </button>
      </div>

    </div>
  );
};

export default WishItem;