import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Mail, Phone, ArrowRight, Lock } from "lucide-react"; // install lucide-react if needed
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../../../firebase-config";
import { toast } from "react-toastify";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [method, setMethod] = useState("email"); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  
  const navigate = useNavigate();

  // --- Logic Helpers (Kept mostly same, added e.preventDefault) ---
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let user;
      if (isSignUp) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        user = result.user;
        await setDoc(doc(db, "users", user.uid), { email, role: "client" });
        toast.success("Account Created!");
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        user = result.user;
        toast.success("Welcome back!");
      }

      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userRole = userDoc.exists() ? userDoc.data().role : "client";
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        navigate(userRole === "admin" ? "/admin" : "/");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: user.displayName,
          role: "client",
        });
      }
      
      const roleData = (await getDoc(doc(db, "users", user.uid))).data().role;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("role", roleData);
      toast.success("Google Login Success");
      navigate(roleData === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", { size: "invisible" });
      }
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmResult(confirmation);
      toast.success("OTP Sent");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await confirmResult.confirm(otp);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), { phone, role: "client" });
      }
      const role = (await getDoc(doc(db, "users", user.uid))).data().role;
      const token = await user.getIdToken();
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      toast.success("Login Success");
      navigate(role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          {isSignUp ? "Start your 30-day free trial." : "Please enter your details."}
        </p>
      </div>

      {/* Input Method Toggles */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setMethod("email")}
          className={`text-sm font-medium pb-1 border-b-2 transition-colors ${method === 'email' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Email
        </button>
        <button 
          onClick={() => setMethod("phone")}
          className={`text-sm font-medium pb-1 border-b-2 transition-colors ${method === 'phone' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Phone
        </button>
      </div>

      {/* FORMS */}
      {method === "email" ? (
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2">
            {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")} <ArrowRight size={16} />
          </button>
        </form>
      ) : (
        /* PHONE FORM */
        <div className="space-y-4">
          {!confirmResult ? (
            <form onSubmit={handlePhoneLogin}>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Mobile Number</label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={(phone) => setPhone("+" + phone)}
                containerStyle={{ width: "100%" }}
                inputStyle={{
                   width: "100%", height: "42px", borderRadius: "8px", borderColor: "#D1D5DB", fontSize: "16px"
                }}
                buttonStyle={{ borderRadius: "8px 0 0 8px", borderColor: "#D1D5DB" }}
              />
              <button disabled={loading} className="w-full mt-4 bg-black hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors">
                 {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp}>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Enter OTP</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center letter-spacing-2"
                placeholder="1 2 3 4 5 6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors">
                Verify & Login
              </button>
              <button onClick={() => setConfirmResult(null)} className="w-full mt-2 text-sm text-gray-500 hover:text-black">
                Change Number
              </button>
            </form>
          )}
          <div id="recaptcha-container"></div>
        </div>
      )}

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
        <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
      </div>

      {/* Google Button */}
      <button 
        onClick={handleGoogleLogin}
        className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-3"
      >
        <img src="/logo/icons8-google-48.png" alt="Google" className="h-5 w-5" />
        Google Account
      </button>

      {/* Footer Toggle */}
      <p className="mt-8 text-center text-sm text-gray-600">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSignUp(!isSignUp)} className="font-semibold text-blue-600 hover:text-blue-500 hover:underline">
          {isSignUp ? "Log in" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;