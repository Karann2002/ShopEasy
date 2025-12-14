import React from 'react'
import { CircleUserRound ,ShoppingBag ,Bell, Search} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = ({toggleSidebar}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);


const handleLogout = () => {
    localStorage.clear(); // Remove role if stored
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page
  };
  
  return (
    <nav className="sticky  top-0 bg-white w-full shadow-md p-4 flex flex-row justify-between overflow-hidden z-50 gap-2 items-center">
        <div className='flex items-center space-x-4'>   
        <button
        onClick={toggleSidebar}
        className="text-2xl px-3 py-1 rounded hover:bg-gray-300"
      >
        ☰
      </button>
    <Link to="/">
    <h1 className="text-xl font-bold"><img src="../../../public/fkheaderlogo_exploreplus-44005d.svg" alt="" /></h1></Link>
    </div>
    
    <div className="flex items-center p-2 bg-blue-100  rounded-md w-full max-w-2xl ">
      <Search style={
        {  color: "gray",gap: "10px"}
      }/>
      <input type="text" placeholder=" Search for Products ,Brands and More... " className=" rounded px-4 py-2 w-full outline-none" />
    </div>
    <div className="space-x-4 flex">
    
      {/* <button className="hover:text-emerald-500 flex gap-1 items-center"><ShoppingBag/>Cart</button>
      <button className="hover:text-emerald-500 flex gap-1 items-center"><Bell/>Notification</button> */}
     {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
          >
            Login
          </button>
        )}
    </div>
  </nav>
  )
}

export default Navbar
