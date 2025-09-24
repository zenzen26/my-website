"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20">
      <div className="container-1 mx-auto flex flex-col space-y-4 px-4">
        <h2 className="text-2xl font-bold mb-4">Contact Me</h2>

        {/* Contact info */}
        <div className="flex flex-col space-y-2 b3">
          <a href="mailto:thamzien@gmail.com" className="hover:bold">
            Email: thamzien@gmail.com
          </a>
          <a href="tel:+61450190503" className="hover:bold">
            Phone: +61 450 190 503
          </a>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="hover:underline"
          >
            Download Resume
          </Link>
        </div>

        {/* Social links */}
        <div className="flex space-x-4 mt-4 b3">
          <a href="https://github.com/zenzen26" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/zi-en-tham-605a40161/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://public.tableau.com/app/profile/zenzen26/vizzes" target="_blank" rel="noopener noreferrer">
            Tableau
          </a>
        </div>
      </div>
    </footer>
  );
}
