"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Papa from "papaparse";

interface Card {
  image: string;
  title: string;
  description: string;
}

export default function ThreeDCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const radius = 300;
  const sideOffset = 250;
  const scaleFactor = 0.8;

  // Fetch CSV from public folder
  useEffect(() => {
    fetch("/projects.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const featuredCards: Card[] = results.data
              .filter((row: any) => row.Featured?.toLowerCase() === "true")
              .map((row: any) => ({
                title: row["Title"] || "",
                description: row["Short Description"] || "",
                image: row["Thumbnail"] || "",
              }));
            setCards(featuredCards);
          },
        });
      });
  }, []);

  const cardCount = cards.length;

  const rotateCarousel = useCallback(() => {
    if (!trackRef.current) return;
    Array.from(trackRef.current.children).forEach((cardEl, i) => {
      const diffRaw = i - currentIndex;
      let diff = (diffRaw + cardCount) % cardCount;
      if (diff > cardCount / 2) diff -= cardCount;

      let x = 0,
        z = 0,
        scale = 1,
        rotateY = 0,
        overlayOpacity = 0;

      switch (diff) {
        case 0:
          x = 0;
          z = radius;
          scale = 1;
          rotateY = 0;
          overlayOpacity = 0;
          break;
        case 1:
        case -cardCount + 1:
          x = sideOffset;
          z = radius - 100;
          scale = scaleFactor;
          rotateY = -20;
          overlayOpacity = 0.2;
          break;
        case 2:
        case -cardCount + 2:
          x = sideOffset * 2;
          z = radius - 200;
          scale = 0.6;
          rotateY = -15;
          overlayOpacity = 0.5;
          break;
        case -1:
        case cardCount - 1:
          x = -sideOffset;
          z = radius - 100;
          scale = scaleFactor;
          rotateY = 20;
          overlayOpacity = 0.2;
          break;
        case -2:
        case cardCount - 2:
          x = -sideOffset * 2;
          z = radius - 200;
          scale = 0.6;
          rotateY = 15;
          overlayOpacity = 0.5;
          break;
        default:
          x = 0;
          z = radius - 300;
          scale = 0.4;
          rotateY = 0;
          overlayOpacity = 0.7;
      }

      const el = cardEl as HTMLElement;
      el.style.transform = `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`;
      el.style.zIndex = `${Math.round(scale * 100)}`;

      let overlay = el.querySelector(".overlay") as HTMLElement;
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className =
          "overlay absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl";
        el.appendChild(overlay);
      }
      overlay.style.backgroundColor = `rgba(128,128,128,${overlayOpacity})`;
    });
  }, [currentIndex, cardCount]);

  useEffect(() => rotateCarousel(), [currentIndex, rotateCarousel]);

  const nextCard = useCallback(() => setCurrentIndex((prev) => (prev + 1) % cardCount), [cardCount]);
  const prevCard = useCallback(() => setCurrentIndex((prev) => (prev - 1 + cardCount) % cardCount), [cardCount]);

  const startAutoRotate = useCallback(() => {
    stopAutoRotate();
    autoRotateRef.current = setInterval(nextCard, 3000);
  }, [nextCard]);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current);
  }, []);

  useEffect(() => startAutoRotate(), [startAutoRotate]);

  if (cards.length === 0) return <p>Loading featured projects...</p>;

  return (
    <div className="flex w-full justify-center items-center perspective-[1500px] my-10">
      <div
        ref={trackRef}
        className="relative w-[1200px] h-[600px] transform-gpu transition-transform duration-500 overflow-visible"
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 flex flex-col items-center justify-start rounded-xl border-2 border-black bg-white shadow-lg cursor-pointer transition-all duration-500 overflow-hidden"
            style={{ width: 500, height: 650 }}
            onClick={() => {
              stopAutoRotate();
              const diffRaw = i - currentIndex;
              let diff = (diffRaw + cardCount) % cardCount;
              if (diff > cardCount / 2) diff -= cardCount;
              if (diff === 0) return;
              else if (diff > 0) nextCard();
              else prevCard();
            }}
          >
            <div className="h-[40%] w-full bg-black relative">
              <Image src={card.image} alt={card.title} className="w-full h-full object-cover" fill />
            </div>
            <div className="items-start justify-center w-full p-5 space-y-3">
              <h4>{card.title}</h4>
              <p className="b2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
