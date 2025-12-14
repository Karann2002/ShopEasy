import React from 'react'
import Navbar from '../Components/Common/Navbar';
import { Outlet } from 'react-router-dom';
import Productlist from '../Components/Common/Product/Productlist';
import Footer from '../Components/Others/Footer';

const ProductLayout = () => {
  return (
     <div className="">
      <Navbar />
      <Productlist/>
      <main className="mt-10">
        <Outlet /> {/* Renders nested route components */}
      </main>
      <Footer/>
    </div>
  )
}

export default ProductLayout;
