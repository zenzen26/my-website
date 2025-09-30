"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/navbar";
import Papa from "papaparse";

interface ProjectCard {
  Title: string;
  "Short Description": string;
  Thumbnail: string;
  Featured?: string;
}

export default function Projects() {
  const [cards, setCards] = useState<ProjectCard[]>([]);

  useEffect(() => {
    fetch("/projects.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse<ProjectCard>(csvText, { header: true });
        setCards(parsed.data);
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
              <div key={i} className="h-[600px] card-1">
                <div className="h-[40%] w-full relative overflow-hidden rounded-t-xl">
                    <Image
                        src={card.Thumbnail}
                        alt={card.Title}
                        className="object-cover"
                        fill
                    />
                    </div>
                    <div className="items-start justify-center w-full p-5 space-y-3">
                        <h4 className="font-bold">{card.Title}</h4>
                        <p className="b2">{card["Short Description"]}</p>
                    </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
