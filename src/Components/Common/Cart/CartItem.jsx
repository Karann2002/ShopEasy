import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useAuth } from "../../Auth/useAuth";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const { user } = useAuth();

  const handleRemove = async () => {
    if (!user) return;
    try {
      const itemRef = doc(db, "users", user.uid, "cart", item.id);
      await deleteDoc(itemRef);
      toast.success("Item removed");
    } catch (err) {
      console.error("Remove failed:", err);
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      
      {/* Image Section */}
      <div className="w-full sm:w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100 p-2">
        <img
          src={item.image_links || "/placeholder-product.png"}
          alt={item.title}
          className="w-full h-full object-contain mix-blend-multiply"
          onError={(e) => { e.target.src = "/placeholder-product.png"; }}
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 w-full text-center sm:text-left">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
          {item.title}
        </h3>
        
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-100 text-green-800">In Stock</span>
          {item.product_rating && (
            <span className="text-xs text-yellow-500 font-medium">★ {item.product_rating}</span>
          )}
        </div>

        {/* Mobile Price View */}
        <p className="sm:hidden text-lg font-bold text-gray-900 mb-3">₹{item.selling_price}</p>

        <div className="flex items-center justify-center sm:justify-start gap-4">
           {/* Remove Action */}
           <button 
             onClick={handleRemove}
             className="text-sm font-medium text-red-500 hover:text-red-700 hover:underline transition-colors flex items-center gap-1"
           >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
             Remove
           </button>
           <span className="text-gray-300">|</span>
           <button className="text-sm font-medium text-gray-500 hover:text-indigo-600">
             Save for later
           </button>
        </div>
      </div>

      {/* Desktop Price Section (Right Aligned) */}
      <div className="hidden sm:block text-right">
        <p className="text-xl font-bold text-gray-900">₹{item.selling_price}</p>
        <p className="text-sm text-gray-400 line-through">₹{item.mrp || (Number(item.selling_price) * 1.2).toFixed(0)}</p>
      </div>

    </div>
  );
};

export default CartItem;