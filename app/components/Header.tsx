// app/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isVisible ? "bg-mendes-white shadow-md py-2" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo-mendeswear.png" alt="MendesWear Logo" className="h-12 animate-fade-in-up" />
        </div>
        <div className="flex space-x-4 items-center">
          <button className="p-2 text-mendes-gray hover:text-mendes-orange transition">
            <FaSearch size={18} />
          </button>
          <button className="p-2 text-mendes-gray hover:text-mendes-orange transition">
            <FaShoppingCart size={18} />
          </button>
          <button className="px-4 py-2 text-mendes-gray hover:text-mendes-orange transition">
            Login <FaUser className="inline ml-1" />
          </button>
        </div>
      </div>
    </header>
  );
}