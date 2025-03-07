// app/components/SubHeader.tsx
"use client";

import { useState } from "react";
import { FaMale, FaFemale, FaChild } from "react-icons/fa";

export default function SubHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-mendes-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-center space-x-8 text-mendes-gray">
        <a href="#masculino" className="flex items-center hover:text-mendes-orange transition">
          <FaMale className="mr-1" /> Masculino
        </a>
        <a href="#feminino" className="flex items-center hover:text-mendes-orange transition">
          <FaFemale className="mr-1" /> Feminino
        </a>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center hover:text-mendes-orange transition"
          >
            <FaChild className="mr-1" /> Infantil
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-mendes-white shadow-lg rounded-md z-10">
              <a href="#menino" className="block px-4 py-2 text-mendes-gray hover:text-mendes-orange hover:bg-mendes-light">Menino</a>
              <a href="#menina" className="block px-4 py-2 text-mendes-gray hover:text-mendes-orange hover:bg-mendes-light">Menina</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}