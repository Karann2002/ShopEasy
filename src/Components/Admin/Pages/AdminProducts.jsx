import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  deleteDoc,
  doc,
} from "firebase/firestore";

const LIMIT = 50;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async (initial = false) => {
    try {
      const productQuery = query(
        collection(db, "addProduct"),
        orderBy("title"), // Change this to a field that exists in all documents (e.g., timestamp)
        limit(LIMIT),
        ...(initial || !lastDoc ? [] : [startAfter(lastDoc)])
      );

      const snapshot = await getDocs(productQuery);
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts((prev) => [...prev, ...fetchedData]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === LIMIT);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete?");
    if (!confirm) return;

    try {
      setDeletingId(id);
      await deleteDoc(doc(db, "addProduct", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Admin Product List
      </h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading products...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={product.image_links}
                  alt={product.title}
                  className="w-full h-48 object-contain"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    ₹{product.selling_price}
                  </p>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className={`mt-2 px-4 py-2 text-sm font-medium text-white rounded ${
                      deletingId === product.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {deletingId === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setLoadingMore(true);
                  fetchProducts();
                }}
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded"
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminProducts;
