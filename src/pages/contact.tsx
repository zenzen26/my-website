"use client";

import NavBar from "@/components/navbar";
import Footer from "@/components/footer";



export default function Contact() {
  
  return (
    <main>
      <NavBar />
      <section className="section">
        <div className="container-1 space-y-10 flex flex-col items-start justify-center">
          <h1 className="">Let&apos;s Connect</h1>
          <div className="w-full flex justify-between">
            <div className="w-full max-w-[1/2] flex flex-col b1 space-y-2">
              <a href="mailto:thamzien@gmail.com">Email: <span className="hover:underline">thamzien@gmail.com</span></a>
              <a href="tel:+61450190503">Phone: <span className="hover:underline">+61 450 190 503</span></a>

              <h4 className="font-black underline mt-10">My socials</h4>
               <div className="flex space-x-10 b1">
                <a href="https://github.com/zenzen26" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                <a href="https://www.linkedin.com/in/zi-en-tham-605a40161/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                <a href="https://public.tableau.com/app/profile/zenzen26/vizzes" target="_blank" rel="noopener noreferrer" className="hover:underline">Tableau</a>
               </div>                
            </div>
           
            <div className="w-full max-w-[1/2] flex flex-col space-y-2">
              <h4 className="font-black underline">Resume</h4>
              <div className="flex space-x-10 b1">
                <a href="https://github.com/zenzen26" target="_blank" rel="noopener noreferrer" className="b2 btn py-1 px-5 rounded-full">GitHub</a>
                <a href="https://www.linkedin.com/in/zi-en-tham-605a40161/" target="_blank" rel="noopener noreferrer" className="b2 btn py-1 px-5 rounded-full">LinkedIn</a>
                <a href="https://public.tableau.com/app/profile/zenzen26/vizzes" target="_blank" rel="noopener noreferrer" className="b2 btn py-1 px-5 rounded-full">Tableau</a>
               </div> 
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
