"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full py-10 md:py-20">
      <div className="container-1 mx-auto flex flex-col space-y-4 px-4 py-6">
        <h2 className="text-xl font-bold mb-2">Contact Me</h2>

        {/* Contact info */}
        <div className="flex flex-col space-y-2 b1">
          <a href="mailto:thamzien@gmail.com">
            Email: <span className="hover:underline">thamzien@gmail.com</span>
          </a>
          <a href="tel:+61450190503">
            Phone: <span className="hover:underline">+61 450 190 503</span>
          </a>
          <Link href="/resume.pdf" target="_blank" className="hover:underline">
            Download Resume
          </Link>
        </div>

        {/* Social links */}
        <div className="flex space-x-4 mt-4 b1">
          <a href="https://github.com/zenzen26" target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/zi-en-tham-605a40161/" target="_blank" rel="noopener noreferrer" className="hover:underline">
            LinkedIn
          </a>
          <a href="https://public.tableau.com/app/profile/zenzen26/vizzes" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Tableau
          </a>
        </div>
      </div>
    </footer>
  );
}
