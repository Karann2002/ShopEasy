import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useAuth } from "../../Auth/useAuth";
import WishItem from "./WishItem";

const WishList = () => {
  const { user } = useAuth();
  const [wishItems, setWishItems] = useState([]);

  useEffect(() => {
    if (!user) return;

    const wishRef = collection(db, "users", user.uid, "wishlist");
    const unsubscribe = onSnapshot(wishRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishItems(items);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100  px-4 sm:px-6">
      <div className="h-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Saved Items</h2>
            <p className="text-sm text-gray-400 mt-1">Keep track of products you love</p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {wishItems.length} Items
          </span>
        </div>

        {/* List Body */}
        <div className="px-8 py-4 bg-white min-h-[300px]">
          {wishItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center py-12 opacity-60">
              <span className="text-6xl mb-4 grayscale">🎁</span>
              <p className="text-lg font-medium text-gray-600">No saved items yet.</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-6">
              {wishItems.map((item, index) => (
                <div key={item.id} className={index !== wishItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
                   {/* Note: Ensure WishItem is styled as a Horizontal Row for this layout */}
                   <WishItem item={item} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Action */}
        {wishItems.length > 0 && (
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end">
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
              Move all to Cart &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;