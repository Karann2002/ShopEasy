import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../../firebase-config"; // Adjust path as needed
import { doc, getDoc } from "firebase/firestore";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "addProduct", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() };
        setProduct(data);
        document.title = data.title || "Product Detail";
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-4 bg-gray-300 rounded-full mb-2"></div>
          Loading Product...
        </div>
      </div>
    );
  }

  // Safe highlight parsing
  // const highlightsArray = product.highlights
  //   ? product.highlights.split(",").map((s) => s.trim())
  //   : [];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-6 font-medium">
          <span className="hover:text-gray-900 cursor-pointer">{product.category_1}</span>
          <span className="mx-2">/</span>
          <span className="hover:text-gray-900 cursor-pointer">{product.category_2}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.category_3}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT COLUMN: Images & Description (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex justify-center items-center overflow-hidden">
              <img
                src={product.image_links?.[0]}
                alt={product.title}
                className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Highlights Section (If exists) */}
            {/* {highlightsArray.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlightsArray.map((item, index) => (
                    <li key={index} className="flex items-start text-gray-600">
                      <span className="mr-2 text-green-500">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
          </div>

          {/* RIGHT COLUMN: Sticky Purchase Card (Spans 1 column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 space-y-6">
              
              {/* Header Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    ★ {product.product_rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    Sold by <span className="font-medium text-blue-600">{product.seller_name}</span> ({product.seller_rating}★)
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4"></div>

              {/* Price Block */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Price</p>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-gray-900">₹{product.selling_price}</span>
                  <span className="text-lg text-gray-400 line-through mb-1">₹{product.mrp}</span>
                  <span className="text-sm font-medium text-green-600 mb-1">
                    {Math.round(((product.mrp - product.selling_price) / product.mrp) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => window.open(`/buy/${product.id}`, "_blank")}
                  className="w-full bg-black text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform active:scale-95"
                >
                  Buy Now
                </button>
                <button className="w-full bg-white text-gray-900 font-semibold py-4 rounded-xl border-2 border-gray-200 hover:border-gray-900 transition">
                  Add to Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-500 pt-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-gray-100 rounded-full">🛡️</div>
                  <span>Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-gray-100 rounded-full">🚚</div>
                  <span>Free Ship</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-gray-100 rounded-full">↩️</div>
                  <span>Returns</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;