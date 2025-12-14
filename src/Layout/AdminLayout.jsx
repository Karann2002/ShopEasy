import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../Components/Admin/AdminComponents/Navbar/AdminNavbar';
import ClientSideBar from "../Components/Admin/AdminComponents/SideBar/AdminSideBar"
import { useState } from 'react';
import Footer from '../Components/Others/Footer';



const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="">
       
      <AdminNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
      <div className="flex flex-1 bg-white z-50">
      <ClientSideBar isOpen={sidebarOpen} />
      <main className='bg-slate-100 h-200 w-full p-4 overflow-y-auto'>
      <Outlet/>
      
      </main>
   
    </div>
    <Footer/>
    </div>
  
  )
}

export default AdminLayout
