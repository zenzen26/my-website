"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  { date: "MAY 2025-Present | Trivesta", title: "Web Developer", description: "Supported front and back-end development, bug fixes, feature implementation, and testing for functionality and responsiveness. \n\nBuilt the company website using PHP, Flowbite, and TailwindCSS, and collaborated with IT/marketing on updates." },
  
  { date: "FEB 2025-JUN 2025 | UTS", title: "Teaching Assistant", description: "Led Computer Science Studio 2 tutorial class and grade students' research paper" },

  { date: "SEP 2024-Present | Flash Media Solutions", title: "Operation Analyst", description: "Developed Excel with VBA for inventory, warranty, hosting and delivery management systems. \n\nBuilt a modern e-commerce website using WordPress and WooCommerce. \n\nProvided client support and generated basic sales insights with Tableau dashboards." },

  { date: "AUG 2024-DEC 2024 | La Trobe Univeristy", title: "Research Assistant", description: "Developed co-learning using MedNext model for brain haemorrhage detection, achieving 86% accuracy in classifying brain hemorrhage in CT scans. \n\nContributed to the “MedConv Beat Transformers on Long-Tailed Bone Density Prediction” paper. This paper adapted Bal-CE loss and post-hoc logit adjustment to improve class balance and achieved up to 21% improvement in accuracy and 20% in ROC AUC over previous state-of-the-art methods." },

  { date: "JAN 2023-JUN 2024 | UTS", title: "U:PASS Data Team", description: "Entered and monitored over 200 sessions' attendance data in Excel. \n\nConvert and clean data into useable format for reporting, \n\nCreates reports with charts to show the study pattern and final grades per subject" },

  { date: "JAN 2023-JUN 2024 | UTS", title: "U:PASS Leader", description: "Led a assisted learning class for Data Structure and Object Oriented Programming subject. \n\n Explain different programming concept to students and guide them in problem solving." },

  { date: "AUG 2022-JUN 2024 | UTS", title: "Student Ambassador", description: "Assists in outreach program in UTS. \n\nAnswered course queries from parents and prospective students. \n\n Led AI and Game Workshops for Year 11 students" },

  { date: "DEC 2019-MAR 2020 | NetOnBoard Sdn Bhd", title: "Technical Support Engineer", description: "Troubleshoot servers and perform server deployment. \n\n Wrote bash and powershell script for various cron jobs. \n\n Set up and manage firewall system." },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalHeight = Math.max(rect.height - windowH, 1);
      const scrollY = Math.min(Math.max(0, -rect.top), totalHeight);
      const pct = scrollY / totalHeight;
      setProgress(pct);
    };

    handle(); // initial check for first card
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, []);

  return (
    <main>
      <section className="space-y-5 py-20">
        <div className="container-1 space-y-10 flex flex-col items-start justify-center">
          <h1>Experience</h1>
          <p className="b2"><strong><i>Last Modified on 12 Oct 2025 ... </i></strong></p>

          <div ref={containerRef} className="relative w-full max-w-5xl mx-auto my-20 py-20">
           <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-gray-300">
                <div
                    className="absolute top-0 left-0 w-full bg-black"
                    style={{ height: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
                />
            </div>
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center b3"><strong>Present</strong></span>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-center b3"><strong>Took my first breath</strong></span>

            <div className="space-y-32">
              {events.map((event, i) => {
                const side = i % 2 === 0 ? "left" : "right";

                // Determine if the card should be visible
                let isVisible = false;
                if (itemRefs.current[i]) {
                  const containerRect = containerRef.current!.getBoundingClientRect();
                  const itemRect = itemRefs.current[i]!.getBoundingClientRect();
                  const itemCenterY = itemRect.top - containerRect.top + itemRect.height / 2;
                  const fillHeight = progress * containerRect.height;
                  isVisible = fillHeight >= itemCenterY * 0.7; //Change here to adjust how early the card should appear
                }
                // first two card always visible
                if (i === 0 || i === 1) isVisible = true;

                return (
                  <div key={i} className="relative flex w-full items-center">
                    {/* Dot */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 rounded-full z-10 w-[20px] h-[20px] ${
                        isVisible ? "bg-black" : "bg-gray-300"
                      }`}
                    />

                    {/* Card */}
                    <motion.div
                        ref={(el) => { itemRefs.current[i] = el; }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`w-5/12 p-6 space-y-2 bg-white border border-black rounded-[20px] shadow-md ${
                            side === "left" ? "mr-auto text-right" : "ml-auto text-left"
                        }`}
                    >
                      <p className="b3 text-gray-500">{event.date}</p>
                      <h4>{event.title}</h4>
                      <p className="b4 whitespace-pre-line">{event.description}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
