import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../firebase-config"; 


const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Noise-cancelling over-ear headphones with deep bass and long battery life.",
    price: "89.99",
    stock: "25",
    category: "Electronics",
    imgURL: "https://example.com/images/headphones.jpg",
    imagePublicId: "products/headphones-001"
  },
  {
    name: "Smart Fitness Band",
    description: "Water-resistant fitness band with heart rate monitor and step counter.",
    price: "39.99",
    stock: "50",
    category: "Electronics",
    imgURL: "https://example.com/images/fitnessband.jpg",
    imagePublicId: "products/fitnessband-001"
  },
  {
    name: "Kids Educational Toy Set",
    description: "STEM-based building blocks for kids ages 6 and up.",
    price: "29.99",
    stock: "40",
    category: "Toys",
    imgURL: "https://example.com/images/toyset.jpg",
    imagePublicId: "products/toyset-001"
  },
  {
    name: "Organic Face Cream",
    description: "Natural and chemical-free moisturizer for daily skincare.",
    price: "19.99",
    stock: "60",
    category: "Beauty",
    imgURL: "https://example.com/images/facecream.jpg",
    imagePublicId: "products/facecream-001"
  },
  {
    name: "Electric Kettle",
    description: "1.5L fast-boil stainless steel electric kettle with auto shut-off.",
    price: "24.99",
    stock: "35",
    category: "Appliances",
    imgURL: "https://example.com/images/kettle.jpg",
    imagePublicId: "products/kettle-001"
  }
];

export const bulkUploadProducts = async () => {
  const productRef = collection(db, "addProduct");

  try {
    for (const product of products) {
      await addDoc(productRef, product);
    }
    console.log("All products uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products:", error);
  }
};
