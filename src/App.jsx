import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Components/Common/DashBoard";
import AuthLayout from "./Layout/AuthLayout";
import Features from "./Components/Admin/Pages/Features";
import AdminProducts from "./Components/Admin/Pages/AdminProducts";
import AdminLayout from "./Layout/AdminLayout";
import Checkout from "./Components/Common/Orders";
import Profile from "./Components/Common/Account/Profile";
import AdminDashBoard from "./Components/Admin/Pages/AdminDashBoard";
import UnAuthPage from "./Components/Others/UnAuthPage";
import PageNotFound from "./Components/Others/PageNotFound";
import CommonLayout from "./Layout/CommonLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import AdminProductForm from "./Components/Admin/AdminComponents/Products/AdminProductForm";
import Products from "./Components/Common/Product/Products";
import CSVUploader from "./Components/Admin/AdminComponents/Products/CSVUploader";
import ProductDetail from "./Components/Common/Product/ProductDetail";
import SearchResults from "./Components/Common/SearchResults";
import ProductLayout from "./Layout/ProductLayout";
import AccountLayout from "./Layout/AccountLayout";
import AuthPage from "./Components/Auth/AuthPage";
import { ToastContainer } from "react-toastify";
import Users from "./Components/Admin/Pages/Users";
import CartList from "./Components/Common/Cart/CartList";
import WishList from "./Components/Common/Wishlist/WishList";
import AllNotifications from "./Components/Common/Account/AllNotifications";
import GiftCards from "./Components/Common/Account/GiftCards";
import MyCoupons from "./Components/Common/Account/MyCoupons";
import ManageAddress from "./Components/Common/Account/ManageAddress";
import PANInfo from "./Components/Common/Account/PANInfo";
import SavedCards from "./Components/Common/Account/SavedCards";
import SavedUPI from "./Components/Common/Account/SavedUPI";
import MyReviewRating from "./Components/Common/Account/MyReviewRating";
import Orders from "./Components/Common/Orders";
import Seller from "./Components/Common/Seller";

function App() {
  return (
    <>
      {" "}
      <ToastContainer
        position={window.innerWidth < 640 ? "top-center" : "bottom-right"}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="becomeSeller" element={<Seller />} />


            <Route element={<ProtectedRoute allowedRoles={"client"} />}>
              <Route path="cart" element={<CartList />} />

            </Route>

            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<AccountLayout />} />
          </Route>
          <Route path="/account" element={<AccountLayout />}>
            <Route
              index
              element={<Navigate to="/account/personalInfo" replace />}
            />
            <Route path="personalInfo" element={<Profile />} />
              <Route path="orders" element={<Orders />} />

            <Route path="wishlist" element={<WishList />} />
            <Route path="notification" element={<AllNotifications />} />
            <Route path="giftcards" element={<GiftCards />} />
            <Route path="coupons" element={<MyCoupons />} />
            <Route path="manageaddress" element={<ManageAddress />} />
            <Route path="pan_info" element={<PANInfo />} />
            <Route path="cards" element={<SavedCards />} />
            <Route path="upis" element={<SavedUPI />} />
            <Route path="review&rating" element={<MyReviewRating />} />
            



          </Route>

          <Route path="/products" element={<ProductLayout />}>
            <Route index element={<Products replace />} />
            {/* <Route path="products" element={< />} /> */}
            <Route path="search" element={<SearchResults />} />

            <Route path=":id" element={<ProductDetail />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="login" element={<AuthPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={"admin"} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />

              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route path="features" element={<Features />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="addproduct" element={<AdminProductForm />} />
              <Route path="uploadCSV" element={<CSVUploader />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<UnAuthPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
