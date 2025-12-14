import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = ({isOpen}) => {
   

  return (
    <aside className={`bg-white  p-4 w-64  transition-all duration-300 
    ${isOpen ? "block" : "hidden"}`}>
      
      <ul className="space-y-4">
        <li className="hover:text-emerald-400"><Link to="/admin/dashboard">Dashboard</Link></li>
        <li className="hover:text-emerald-400"><Link to="/admin/products">Products</Link></li>
        <li className="hover:text-emerald-400"><Link to="/admin/users">Users</Link></li>

        <li className="hover:text-emerald-400"><Link to="/profile">Profile</Link></li>
        <li className="hover:text-emerald-400"><Link to="/admin/addproduct">Add Product</Link></li>


        <li className="hover:text-emerald-400 ">Settings</li>
      </ul>
    </aside>
  )
}

export default AdminSideBar
