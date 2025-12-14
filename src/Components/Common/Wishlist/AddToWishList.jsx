import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useAuth } from "../../Auth/useAuth";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const AddToWishList = ({ product }) => {
  const [liked, setLiked] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const wishlistRef = collection(db, "users", user.uid, "wishlist");
        const snapshot = await getDocs(wishlistRef);
        const likedProductIds = snapshot.docs.map((doc) => doc.id);
        setLiked(likedProductIds);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  const toggleLike = async (productId) => {
    if (!user) return toast.error("Please login to add to wishlist");

    const isLiked = liked.includes(productId);

    try {
      const wishlistRef = doc(db, "users", user.uid, "wishlist", productId);

      if (isLiked) {
        await deleteDoc(wishlistRef, {}); 
        setLiked((prev) => prev.filter((id) => id !== productId));
        toast.info("Removed from Wishlist");
      } else {
        
        await setDoc(wishlistRef, {
          ...product,
          quantity: 1,
          addedAt: Date.now(),
        });
        setLiked((prev) => [...prev, productId]);
        toast.success("Added to Wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update Wishlist");
    }
  };

  return (
    <button
      onClick={() => toggleLike(product.id)}
      className="absolute top-2 right-2 p-1 bg-white rounded-full hover:bg-red-100 z-10"
      aria-label={liked.includes(product.id) ? "Unlike product" : "Like product"}
    >
      <Heart
        className={`w-5 h-5 ${
          liked.includes(product.id)
            ? "text-red-500 fill-red-500"
            : "text-gray-500"
        }`}
      />
    </button>
  );
};

export default AddToWishList;
