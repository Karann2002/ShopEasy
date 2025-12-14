import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase-config";
import { collection, onSnapshot, } from "firebase/firestore";


const Users = () => {
      const [users, setUsers] = useState([]);
    
     useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setUsers(data);
    });

    return () => unsub();
  }, []);
  return (
    <div>
        <div>
            <h1 className="font-bold text-2xl p-5">Users</h1>
        </div>
       {users.map((product) => (
      <div key={product.id} className="bg-white  shadow-md overflow-hidden border ">
       
        <div className="p-4 ">
          <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.name || "N/A"}</h3>
          <p className="text-gray-600 font-medium">{product.role}</p>
          <p className="text-gray-600 font-medium">{product.email}</p>
          <p className="text-gray-600 font-medium">{product.phone}</p>

        </div>
      </div>
       
      
    ))}
    </div>
  )
}

export default Users
