import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";


const UnAuthPage = () => {
  const navigate = useNavigate();
  return (
     <div className=" flex flex-col justify-center items-center w-full">
      <div className="min-h-screen bg-white p-10  shadow-md w-full    text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-500 mb-6">
          You don't have permission to view this page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  )
}

export default UnAuthPage
