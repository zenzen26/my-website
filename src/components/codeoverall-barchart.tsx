"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CodeOverallChart() {
  const data = {
    labels: ["HTML/CSS", "PHP", "Python", "SQL", "Java", "JavaScript", "C++"],
    datasets: [
      {
        label: "Proficiency",
        data: [10, 8, 8, 8, 5, 6, 3],
        backgroundColor: "#000",
      },
    ],
  };

   const descriptions = [
    "worked with Tailwind",
    "worked with Laravel, BladePHP",
    "mainly on sklearn, matlplotlib, etc for data modelling & exploration",
    "mainly on mysql & postgresql",
    "worked on mobile app on android studio",
    "for web animation",
    "learnt during data structure",
  ];

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 5,
          font: { size: 16, family: "Share Tech Mono" },
        },
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
        border: {
            display: false,   // removes axis line
        },
        title: {
          display: true,
          text: "Proficiency",
          font: { size: 16, family: "Share Tech Mono" },
        },
      },
      y: {
        ticks: {
          font: { size: 16, family: "Share Tech Mono" },
        },
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
        border: {
            display: false, 
        },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Code Skill Overview",
        font: { size: 24, family: "Silkscreen", weight: 400 },
      },
      tooltip: {
        title: { display: false },
        callbacks: {
          label: function (context: any) {
            const idx = context.dataIndex;
            return descriptions[idx];
          },
        },
        bodyFont: { size: 10, family: "Share Tech Mono" },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
