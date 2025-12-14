import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../firebase-config"; 
import { bulkUploadProducts } from "./bulkUploadProducts"; 
import CSVUploader from "./CSVUploader";
import { useNavigate } from "react-router-dom";
export default function AdminProductForm() {
  const [formdata, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imgURL: "",
    imagePublicId: ""
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "addProduct"), formdata);
      alert("Form submitted successfully!");
      
      setFormData({ name: "",description:"", price: "", stock: "", category: "", imgURL: "", imagePublicId: "" });
      // setShowPopup(false);  
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <button onClick={bulkUploadProducts} className="p-2 bg-green-500 text-white rounded">
      Upload Products
    </button>
    <button onClick={() => navigate("/admin/uploadCSV")}className="p-2 bg-blue-500 text-white rounded m-2">CSV File</button>
     

      
        <div className=" flex items-center justify-left">
        <div 
        className="">
          <div className="fixed " />

          <div className=" inset-0  flex items-center justify-left p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 ">
              <div className="text-lg font-semibold text-gray-800 mb-4">
                Add New Product
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formdata.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formdata.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formdata.price}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded" 
                />
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity"
                  value={formdata.stock}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded" 
                />  
                <input  
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formdata.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                        
                />
                <input

                    type="text"
                    name="imgURL"
                    placeholder="Image URL"
                    value={formdata.imgURL}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                    type="text"
                    name="imagePublicId"
                    placeholder="Image Public ID"
                    value={formdata.imagePublicId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                    <div className="flex justify-left gap-4">
                  <button
                    type="submit"
                    className="bg-stone-900 text-white px-4 py-2 rounded hover:bg-stone-700"
                  >
                    Add Product
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
      {/* )} */}
    </div>
  );
}
