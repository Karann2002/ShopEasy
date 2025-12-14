import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold mb-4">ShopEasy</h1>
          <p className="text-gray-400 text-sm">Your one-stop shop for everything.</p>
          <div className="flex gap-4 mt-4">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="hover:text-blue-700 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">Dashboard</a></li>
            <li><a href="#" className="hover:text-white">Shop</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Customer Service</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Order Tracking</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-sm text-gray-400">Email: support@ShopEasy.com</p>
          <p className="text-sm text-gray-400">Phone: +1 (800) 123-4567</p>
          <p className="text-sm text-gray-400">Address: 123 Commerce Ave, NY</p>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8  justify-between border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        
        &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
       
        <img src="/payment-method_69e7ec.svg" alt="" /></div>
      
      
    </footer>
  );
};

export default Footer;
