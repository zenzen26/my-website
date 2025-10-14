"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container-1 mx-auto flex justify-between items-center px-4">
        <Link href="/" className="hover:text-gray-300">
          <h4>My Website</h4>
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Nav Links */}
        <ul
          className={`flex-col sm:flex-row sm:flex space-y-2 sm:space-y-0 sm:space-x-6 b2 absolute sm:static bg-black sm:bg-transparent w-full sm:w-auto left-0 sm:left-auto px-4 sm:px-0 transition-all duration-300 ${
            isOpen ? "top-full opacity-100 px-10 py-5" : "top-[-500px] opacity-0 gap-3 md:gap-5 lg:gap-10"
          } sm:opacity-100`}
        >
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/experience" className="hover:text-gray-300">
              Experience
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-gray-300">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
