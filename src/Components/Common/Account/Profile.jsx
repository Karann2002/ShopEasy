import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth/useAuth";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { toast } from "react-toastify";
import { User, Mail, Phone, Calendar, Edit2, Save, X } from "lucide-react";

export default function AccountSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const allContacts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const userData = allContacts.find((item) => item?.id === user.uid);

        if (userData) {
          setFormData(userData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData?.id) return;
    const docRef = doc(db, "users", formData.id);
    try {
      await updateDoc(docRef, { ...formData });
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Profile...</div>;

  return (
    <div className="bg-white rounded-2xl min-h-screen mx-5 py-10">
      <div className="max-w-4xl mx-auto p-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your personal details and contact info.</p>
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm"
            >
              <Edit2 size={16} /> Edit Details
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Full Name */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
            <div className={`flex items-center border rounded-xl px-4 py-3 ${isEditing ? 'bg-white border-indigo-300 ring-2 ring-indigo-50' : 'bg-gray-50 border-gray-200'}`}>
              <User size={18} className="text-gray-400 mr-3" />
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent outline-none text-gray-800 font-medium"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gender</label>
            <div className={`flex items-center gap-6 px-4 py-3 border rounded-xl h-[50px] ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-sm text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date of Birth</label>
            <div className={`flex items-center border rounded-xl px-4 py-3 ${isEditing ? 'bg-white border-indigo-300' : 'bg-gray-50 border-gray-200'}`}>
              <Calendar size={18} className="text-gray-400 mr-3" />
              <input
                type="text"
                name="dob" // Note: Ideally use type="date"
                value={formData.dob ? new Date(formData.dob).toLocaleDateString("en-GB") : ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent outline-none text-gray-800"
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className={`flex items-center border rounded-xl px-4 py-3 ${isEditing ? 'bg-white border-indigo-300' : 'bg-gray-50 border-gray-200'}`}>
              <Mail size={18} className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile Number</label>
            <div className={`flex items-center border rounded-xl px-4 py-3 ${isEditing ? 'bg-white border-indigo-300' : 'bg-gray-50 border-gray-200'}`}>
              <Phone size={18} className="text-gray-400 mr-3" />
              <input
                type="tel"
                name="mobilno"
                value={formData.mobilno || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-transparent outline-none text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-blue-50 rounded-xl p-6 mb-10">
          <h3 className="text-blue-800 font-bold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <details className="group">
              <summary className="list-none flex justify-between items-center cursor-pointer text-blue-700 text-sm font-medium">
                What happens when I update my email or mobile?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-blue-600 text-xs mt-2 leading-relaxed">
                Your login credentials will change accordingly. You'll receive all communication on your updated details.
              </p>
            </details>
            <div className="h-px bg-blue-200"></div>
            <details className="group">
              <summary className="list-none flex justify-between items-center cursor-pointer text-blue-700 text-sm font-medium">
                Does my Seller account get affected?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="text-blue-600 text-xs mt-2 leading-relaxed">
                ShopEasy uses single sign-on. Any changes will reflect in your Seller account as well.
              </p>
            </details>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-gray-100 pt-8">
           <h3 className="text-red-600 font-bold mb-4 text-sm uppercase">Danger Zone</h3>
           <div className="flex gap-4">
             <button className="text-sm font-medium text-gray-500 hover:text-gray-900 underline">Deactivate Account</button>
             <button className="text-sm font-medium text-red-500 hover:text-red-700 underline">Delete Account</button>
           </div>
        </div>

      </div>
    </div>
  );
}