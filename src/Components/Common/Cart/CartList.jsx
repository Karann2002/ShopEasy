import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useAuth } from "../../Auth/useAuth";
import CartItem from "./CartItem";

const CartList = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Calculate Subtotal (Assuming item has a 'selling_price' field)
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (Number(item.selling_price) || 0); // content safeguards
  }, 0);

  useEffect(() => {
    if (!user) return;
    const cartRef = collection(db, "users", user.uid, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          
          {/* LEFT COLUMN: Cart Items List */}
          <section className="lg:col-span-8">
            {cartItems.length === 0 ? (
              <div className="bg-white p-10 text-center rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
                <button className="mt-4 text-indigo-600 font-medium hover:text-indigo-500">
                  Continue Shopping &rarr;
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Note: Ensure CartItem is styled to look good in a full-width list */}
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                     <CartItem item={item} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          {cartItems.length > 0 && (
            <section className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">₹{subtotal}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Order Total</dt>
                    <dd className="text-base font-medium text-gray-900">₹{subtotal}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Proceed to Checkout
                  </button>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                   <p>🔒 Secure Transaction</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartList;