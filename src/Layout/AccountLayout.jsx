import React from 'react'
import { Outlet } from 'react-router-dom';
import AccSideBar from '../Components/Common/Account/AccSideBar';
import Navbar from '../Components/Common/Navbar';
import Productlist from '../Components/Common/Product/Productlist';

const AccountLayout = () => {
  return (
    <div>
        <Navbar/>
        <Productlist/>
     <div className="flex flex-1 ml-35 mt-15">
      <AccSideBar/>
      <main className="w-full rounded-2xl">
        <Outlet /> 
      </main>
    </div>
    </div>
  )
}

export default AccountLayout;
