"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar";
import Papa from "papaparse";
import Footer from "@/components/footer";

interface ProjectCard {
  Title: string;
  "Short Description": string;
  Thumbnail: string;
  Link: string;
  Category: string;
  Tags: string;
  Featured?: string;
}

export default function Projects() {
  const [cards, setCards] = useState<ProjectCard[]>([]);

  useEffect(() => {
    fetch("/projects.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse<ProjectCard>(csvText, { header: true });
        const validData = parsed.data.filter(
          (row) => row.Title && row.Thumbnail && row.Link
        );
        setCards(validData);
      });
  }, []);

  return (
    <main>
      <NavBar />
      <section className="section">
        <div className="container-1 space-y-10 flex flex-col items-start justify-center">
          <h1>Projects</h1>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <a
                key={i}
                href={card.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] card-1 block"
              >
                <div className="h-[40%] w-full relative overflow-hidden rounded-t-xl">
                  <Image
                    src={card.Thumbnail}
                    alt={card.Title}
                    className="object-cover"
                    fill
                  />
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 tag bg-yellow-300/90 text-black font-bold px-3 py-1">
                    {card.Category}
                  </span>
                </div>

                <div className="flex flex-col justify-between h-[60%] w-full p-5 space-y-3">
                  <div>
                    <h4>{card.Title}</h4>
                    <p className="b2">{card["Short Description"]}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {card.Tags?.split(",").map((tag, idx) => (
                      <span
                        key={idx}
                        className="tag px-3 py-1 border rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
