"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-black text-white py-4 shadow-md">
      <div className="container-1 mx-auto flex justify-between items-center px-4">
        {/* Logo / Name */}
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          MyPortfolio
        </Link>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/experience" className="hover:text-gray-300 transition">
              Experience
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-gray-300 transition">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-gray-300 transition">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
