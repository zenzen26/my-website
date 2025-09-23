"use client";

import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type SkillKey =
  | "HTML/CSS"
  | "PHP"
  | "PYTHON"
  | "SQL"
  | "JAVA"
  | "JAVASCRIPT"
  | "C++";

const LABELS = [
  "Usage",
  "Preference",
  "Years Experience",
  "Confidence",
  "Proficiency",
];

const SKILLS: Record<SkillKey, number[]> = {
  "HTML/CSS": [4, 3, 5, 5, 5],
  PHP: [3, 2, 1, 4, 4],
  PYTHON: [5, 5, 3, 4, 4],
  SQL: [5, 5, 3, 5, 4],
  JAVA: [1, 3, 1, 3, 3],
  JAVASCRIPT: [3, 3, 1, 4, 3],
  "C++": [1, 1, 1, 3, 2],
};

function radarOptions(title: string): any {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        color: "var(--foreground)",
        font: {
          size: 14, family: "Share Tech Mono"
        },
      },
      tooltip: {
        enabled: true,
        titleFont: { family: "var(--font-body)" },
        bodyFont: { family: "var(--font-body)" },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 5,
        ticks: { display: false },
        grid: { display: true },
        angleLines: { color: "rgba(0,0,0,0.15)" },
        pointLabels: {
          color: "var(--foreground)",
          font: {
           size: 10, family: "Share Tech Mono"
          },
        },
      },
    },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 0 },
    },
  };
}


function radarData(values: number[]) {
  return {
    labels: LABELS,
    datasets: [
      {
        label: "Score",
        data: values,
        borderColor: "rgba(0,0,0,0.85)",
        backgroundColor: "rgba(0,0,0,0.10)",
      },
    ],
  };
}

export default function SkillRadarGrid() {
  const items = Object.entries(SKILLS) as [SkillKey, number[]][];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map(([name, values]) => (
       <div key={name} className="w-full h-[150px] bg-[var(--background)]">
            <div className="relative w-full h-full">
                <Radar data={radarData(values)} options={radarOptions(name)} />
            </div>
        </div>
      ))}
    </div>
  );
}
