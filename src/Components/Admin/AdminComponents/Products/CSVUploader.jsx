import React, { useState } from 'react';
import Papa from 'papaparse';
import { db } from '../../../../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const CSVUploader = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!csvFile) return alert('Please select a CSV file');

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const products = results.data;

        try {
          const productCollection = collection(db, 'addProduct');

          for (let item of products) {
            // Parse and clean data
            const docData = {
              category_1: item.category_1,
              category_2: item.category_2,
              category_3: item.category_3,
              title: item.title,
              product_rating: parseFloat(item.product_rating) || 0,
              selling_price: parseFloat(item.selling_price) || 0,
              mrp: parseFloat(item.mrp) || 0,
              seller_name: item.seller_name,
              seller_rating: parseFloat(item.seller_rating) || 0,
              description: item.description,
              highlights: item.highlights?.split(',').map(s => s.trim()) || [],
              image_links: item.image_links?.split(',').map(s => s.trim()) || [],
            };

            await addDoc(productCollection, docData);
          }

          setMessage('Upload successful!');
          alert("Upload successful!")
        } catch (error) {
          setMessage('Upload failed: ' + error.message);
        }
      },
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Products (CSV)</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CSVUploader;
