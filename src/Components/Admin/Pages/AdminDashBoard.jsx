import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { UserRound } from "lucide-react";

const AdminDashBoard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState({
    total: 0,
    averagePrice: 0,
    minPrice: 0,
    maxPrice: 0,
  });
  const [userAnalytics, setUserAnalytics] = useState({
    totalUsers: 0,
    usersWithOrders: 0,
    avgOrdersPerUser: 0,
    newUsersThisMonth: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const userList = usersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
      if (userList.length > 0) {
        const prices = userList.map((p) => parseFloat(p.mrp || 0));

        const total = userList.length;
        const usersWithOrders = prices.reduce((a, b) => a + b, 0) / total;
        const avgOrdersPerUser = Math.min(...prices);
        const newUsersThisMonth = Math.max(...prices);

        setUserAnalytics({
          total,
          usersWithOrders: usersWithOrders.toFixed(2),
          avgOrdersPerUser,
          newUsersThisMonth,
        });
      }
    };

    fetchUsers();
  }, []);

  // Fetch products when a user is selected
  useEffect(() => {
    const fetchProducts = async () => {
      const productSnap = await getDocs(collection(db, "addProduct"));
      const productList = productSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productList);

      if (productList.length > 0) {
        const prices = productList.map((p) => parseFloat(p.mrp || 0));

        const total = productList.length;
        const averagePrice = prices.reduce((a, b) => a + b, 0) / total;
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setAnalytics({
          total,
          averagePrice: averagePrice.toFixed(2),
          minPrice,
          maxPrice,
        });
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="text-white bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500 bg-[length:200%_200%] animate-gradient-x p-15 rounded-2xl">
        <h1 className="font-bold text-4xl">Welcome To Dashboard,</h1>
      </div>

      <div className="flex flex-col md:flex-row h-screen mt-5">
        <div className="w-full flex flex-col mr-5">
          <div className="w-full rounded-lg p-6 bg-white  ">
            <h2 className="mt-5 text-4xl font-bold mb-4">
              📊 Products Analytics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl text-gray-500">Total Products</h3>
                <p className="text-xl font-semibold">{analytics.total}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-sm text-gray-500">Average Price</h3>
                <p className="text-xl font-semibold">
                  ₹ {analytics.averagePrice}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-sm text-gray-500">Min Price</h3>
                <p className="text-xl font-semibold">₹ {analytics.minPrice}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-sm text-gray-500">Max Price</h3>
                <p className="text-xl font-semibold">₹ {analytics.maxPrice}</p>
              </div>
            </div>
          </div>
          <div className="w-full  rounded-lg p-6 bg-white mt-5 ">
            <h2 className="text-4xl font-bold mb-4">📊 User's Analytics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="bg-white  p-4 rounded shadow">
                <h3 className="text-2xl text-gray-500">Total User's</h3>
                <p className="text-xl font-semibold">{userAnalytics.total}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl text-gray-500">User's With Orders</h3>
                <p className="text-xl font-semibold">
                  {userAnalytics.usersWithOrders}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl text-gray-500">
                  Averge Order Per Person
                </h3>
                <p className="text-xl font-semibold">
                  {userAnalytics.avgOrdersPerUser}
                </p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="text-2xl text-gray-500">New User's</h3>
                <p className="text-xl font-semibold">
                  {userAnalytics.newUsersThisMonth}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Left Panel: Users */}
        <div className="w-full rounded-lg p-5 md:w-1/2 bg-white shadow-md overflow-y-auto ">
          <h2 className="text-4xl font-bold p-4 ">Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={` p-2 cursor-pointer hover:bg-gray-100 rounded shadow mb-1 ${
                  selectedUser?.id === user.id
                    ? "bg-gray-100 font-semibold"
                    : ""
                }`}
              >
                <div className="flex p-2 items-center  ">
                  <UserRound />
                  <div className="pl-2">
                    {user.name || user.phone || "Not Available"} <br />
                    <span className="text-sm text-gray-500">
                      {user.email || "Not Available"}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
