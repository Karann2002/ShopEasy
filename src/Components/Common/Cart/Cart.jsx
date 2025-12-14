import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useAuth } from "../../Auth/useAuth";





const Cart = ({item}) => {
const { user } = useAuth();


 const handleRemove = async () => {
    const itemRef = doc(db, "users", user.uid, "cart", item.id);
    await deleteDoc(itemRef);
  };
  return (
        <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h3>{item.title}</h3>
        <p>₹{item.price}</p>
      </div>
      <button onClick={handleRemove} className="text-red-500 font-semibold">
        Remove
      </button>
    </div>
       
  );
};

export default Cart;
