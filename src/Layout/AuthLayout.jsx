import React from "react";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen bg-black w-full flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND VIDEO */}
      {/* <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/13315369_3840_2160_25fps.mp4" type="video/mp4" />
      </video> */}
      
      {/* Dark Overlay (Important for contrast) */}
      <div className="absolute inset-0 bg-black/60 z-0 backdrop-blur-[2px]" />

      {/* MAIN CONTENT CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden m-4"
      >
        
        {/* LEFT: Info Panel (Glass Effect) */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-white/10 backdrop-blur-md border-r border-white/10 text-white">
           <div>
              <Link to="/">
                <img src="/logo/ShopEasylogo.png" alt="Logo" className="w-24 brightness-200" />
              </Link>
           </div>
           
           <div className="space-y-6">
             <h1 className="text-4xl font-bold leading-tight">
               Join the <br /> 
               Revolution.
             </h1>
             <p className="text-gray-200">
               "ShopEasy transformed how I manage my inventory. It's simply the best tool out there."
             </p>
             
             {/* Simple Dot Indicators for style */}
             <div className="flex gap-2 pt-4">
               <div className="h-1 w-8 bg-white rounded-full"></div>
               <div className="h-1 w-2 bg-white/30 rounded-full"></div>
               <div className="h-1 w-2 bg-white/30 rounded-full"></div>
             </div>
           </div>

           <div className="text-xs text-white/50">
             Start your 14-day free trial today.
           </div>
        </div>

        {/* RIGHT: Form Panel (Solid White) */}
        <div className="bg-white p-8 sm:p-12 flex flex-col justify-center">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 flex justify-center">
              <img src="/logo/ShopEasylogo.png" alt="Logo" className="w-20" />
            </div>

            <Outlet />
        </div>

      </motion.div>
    </div>
  );
};

export default AuthLayout;