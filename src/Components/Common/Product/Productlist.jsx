import React from 'react'
import { ChevronDown ,Menu} from "lucide-react";
import { useState } from 'react';



const menuItems = {
  "Mobiles": [],
  "Electronics": {
    "Mobiles": ["Samsung", "Redmi", "iPhone"],
    "Laptops": ["Gaming", "Business"],
  },
};

const categories = [
  "Kilos",
  "Mobiles",
  "Appliances",
  "Flight Bookings",
];

const fashionItems = [
  "Men's Top Wear", "Men's Bottom Wear", "Women Ethnic", "Men Footwear",
  "Women Footwear", "Watches and Accessories", "Women Western",
  "Bags, Suitcases & Luggage", "Kids", "Essentials", "Winter"
];

const beautyItems = [
  "Beauty & Personal Care", "Toys & Games", "Baby Care", "Grooming"
];
const twoWheelerItems = ["Petrol Vehicles", "Electric Vehicles"];

// const menuItems = {
//   "Men's Top Wear": [
//     "All",
//     "Men's T-Shirts",
//     "Men's Casual Shirts",
//     "Men's Formal Shirts",
//     "Men's Kurtas",
//     "Men's Ethnic Sets",
//     "Men's Blazers",
//     "Men's Raincoat",
//     "Men's Windcheaters",
//     "Men's Suit",
//     "Men's Fabrics",
//   ],
//   "Men's Bottom Wear": [],
//   "Women Ethnic": [],
//   "Men Footwear": [],
//   "Women Footwear": [],
//   "Watches and Accessories": [],
//   "Women Western": [],
//   "Bags, Suitcases & Luggage": [],
//   "Kids": [],
//   "Essentials": [],
//   "Winter": []
// };


function DropdownMenu({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative group min-w-[100px] font-semibold "
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(!open)}
    >
      <button className="flex items-center justify-center text-sm mt-1 hover:text-stone-900 w-full">
        {label} <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute md:left-1/2 md:-translate-x-1/2 left-0 w-48 bg-white shadow-lg py-2 transition-all duration-200 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {Array.isArray(items)
          ? items.map((item, index) => (
              <a
                key={index}
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {item}
              </a>
            ))
          : Object.entries(items).map(([category, subItems], index) => (
              <div key={index} className="group relative">
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {category}
                </a>
                <div className="absolute left-full top-0 mt-0 ml-1 w-48 bg-white shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 ">
                  {subItems.map((subItem, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </li>
  );
}
const Productlist = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
//    <div className="bg-white h-10 p-2  mb-5 relative z-25 shadow-lg">
//   <ul className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-6 md:gap-9 min-w-max">
//     <li className="flex flex-col justify-center items-center font-semibold min-w-[80px]">
//       <span className="text-sm mt-1">Kilos</span>
//     </li>

//     <li className="flex flex-col justify-center items-center font-semibold min-w-[80px]">
//       <span className="text-sm mt-1">Mobiles</span>
//     </li>

//     {/* Electronics with dropdown */}
//    <li className="flex flex-col justify-center items-center font-semibold relative group min-w-[100px] z-50">
//   <div className="relative">
   
//     <button className="text-sm mt-1 flex items-center hover:text-stone-900">
//       Electronics <ChevronDown className="ml-1 h-4 w-4" />
//     </button>

//     {/* Dropdown */}
//     <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
//       {Object.entries(menuItems).map(([category, subItems], index) => (
//         <div key={index} className="relative group/item">
//         <a
//           key={index}
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 text-sm z-50 "
//         >
//           {category}
//         </a>
//         {subItems.length > 0 && (
//               <div className="absolute top-0 left-full mt-0 ml-1 w-56 bg-white shadow-lg opacity-0 group-hover/item:opacity-100 invisible group-hover/item:visible transition-all duration-200 z-50">
//                 {subItems.map((subItem, subIndex) => (
//                   <a
//                     key={subIndex}
//                     href="#"
//                     className="block px-4 py-2 hover:bg-gray-100 text-sm"
//                   >
//                     {subItem}
//                   </a>
//                 ))}
//               </div>
//             )}
// </div>
//       ))}
//     </div>
//   </div>
// </li>
// <li className="flex flex-col justify-center items-center font-semibold relative group min-w-[100px] z-50">
//   <div className="relative">
   
//     <button className="text-sm mt-1 flex items-center hover:text-stone-900">
//       Fashion <ChevronDown className="ml-1 h-4 w-4" />
//     </button>

//     {/* Dropdown */}
//     <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
//       {[
//         "Men's Top Wear",
// "Men's Bottom Wear",
// "Women Ethnic",
// "Men Footwear",
// "Women Footwear",
// "Watches and Accessories",
// "Women Western",
// "Bags, Suitcases & Luggage",
// "Kids",
// "Essentials",
// "Winter",
//       ].map((item, index) => (
//         <a
//           key={index}
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 text-sm z-50 "
//         >
//           {item}
//         </a>
//       ))}
//     </div>
//   </div>
// </li>
// <li className="flex flex-col justify-center items-center font-semibold relative group min-w-[100px] z-50">
//   <div className="relative">
   
//     <button className="text-sm mt-1 flex items-center hover:text-stone-900">
//       Home & Fruniture <ChevronDown className="ml-1 h-4 w-4" />
//     </button>

//     {/* Dropdown */}
//     <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
//       {[
//         "Financial Planning",
//         "Consulting Agency",
//         "Strategy Consulting",
//         "Digital Transformation",
//         "Marketing Consulting",
//         "Insurance Consultancy",
//         "Tax Advisory",
//       ].map((item, index) => (
//         <a
//           key={index}
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 text-sm z-50 "
//         >
//           {item}
//         </a>
//       ))}
//     </div>
//   </div>
// </li>

//     {/* Repeat the structure below for other categories like Fashion, Beauty, etc. */}

//     <li className="flex flex-col justify-center items-center font-semibold min-w-[80px]">
     
//       <span className="text-sm mt-1">Appliances</span>
//     </li>

//     <li className="flex flex-col justify-center items-center font-semibold min-w-[80px]">
//       <span className="text-sm mt-1">Flight Bookings</span>
//     </li>
//     <li className="flex flex-col justify-center items-center font-semibold relative group min-w-[100px] z-50">
//   <div className="relative">
   
//     <button className="text-sm mt-1 flex items-center hover:text-stone-900">
//       Beauty, Toys & more <ChevronDown className="ml-1 h-4 w-4" />
//     </button>

//     {/* Dropdown */}
//     <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
//       {[
//         "Financial Planning",
//         "Consulting Agency",
//         "Strategy Consulting",
//         "Digital Transformation",
//         "Marketing Consulting",
//         "Insurance Consultancy",
//         "Tax Advisory",
//       ].map((item, index) => (
//         <a
//           key={index}
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 text-sm z-50 "
//         >
//           {item}
//         </a>
//       ))}
//     </div>
//   </div>
// </li>
// <li className="flex flex-col justify-center items-center font-semibold relative group min-w-[100px] z-50">
//   <div className="relative">
   
//     <button className="text-sm mt-1 flex items-center hover:text-stone-900">
//       Two Wheelers <ChevronDown className="ml-1 h-4 w-4" />
//     </button>

//     {/* Dropdown */}
//     <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
//       {[
//         "Petrol Vehicles",
//         "Electric Vehicles",
//       ].map((item, index) => (
//         <a
//           key={index}
//           href="#"
//           className="block px-4 py-2 hover:bg-gray-100 text-sm z-50 "
//         >
//           {item}
//         </a>
//       ))}
//     </div>
//   </div>
// </li>
//   </ul>
// </div>
  <div className="bg-white shadow-lg relative mb-3 z-40 ">
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-between items-center">
        
      </div>

      <ul className={`md:flex ${mobileMenuOpen ? 'block' : 'hidden'} md:flex-nowrap flex-wrap  justify-start md:justify-center items-start md:items-center gap-4 md:gap-6 overflow-x-auto md:overflow-visible p-2`}>
        {/* Static categories */}
        {categories.map((cat, i) => (
          <li key={i} className="flex flex-col items-center font-semibold min-w-[80px]">
            <span className="text-sm mt-1">{cat}</span>
          </li>
        ))}

        {/* Dropdown: Electronics */}
        <DropdownMenu label="Electronics" items={menuItems["Electronics"]} />

        {/* Dropdown: Fashion */}
        <DropdownMenu label="Fashion" items={fashionItems} />

        {/* Dropdown: Home & Furniture */}
        <DropdownMenu label="Home & Furniture" items={[
          "Financial Planning", "Consulting Agency", "Strategy Consulting",
          "Digital Transformation", "Marketing Consulting", "Insurance Consultancy",
          "Tax Advisory"
        ]} />

        {/* Dropdown: Beauty, Toys & More */}
        <DropdownMenu label="Beauty, Toys & more" items={beautyItems} />

        {/* Dropdown: Two Wheelers */}
        <DropdownMenu label="Two Wheelers" items={twoWheelerItems} />
      </ul>
    </div>
 
  );
}



export default Productlist
