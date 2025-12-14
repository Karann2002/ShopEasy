import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useAuth } from "../../Auth/useAuth";
import { toast } from "react-toastify";

const AddToCartButton = ({ product }) => {
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) return toast.error("Please login to add to cart");

    try {
      const cartRef = doc(db, "users", user.uid, "cart", product.id);
      await setDoc(cartRef, {
        ...product,
        quantity: 1,
        addedAt: Date.now(),
      });
      toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
