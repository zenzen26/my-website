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

export default function SoftwareChart() {
  const labels = [
    "TABLEAU",
    "POWERBI",
    "EXCEL",
    "FIREBASE",
    "MS ACCESS",
    "GITHUB",
    "LARK",
    "SALESFORCE",
  ];

  const dataValues = [8, 7, 7, 5, 5, 8, 7, 1];

  // Custom descriptions for each software
  const descriptions = [
    "used for data visualisation",
    "used for data visualisation",
    "incl VBA. Used for record keeping & visualisation",
    "often used for web db during testing",
    "used for database management",
    "version control",
    "often used for CRM",
    "only used once for CRM",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Proficiency",
        data: dataValues,
        backgroundColor: "#000",
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          font: { size: 16, family: "Share Tech Mono" },
        },
        grid: { display: false, drawTicks: false, drawBorder: false },
        border: { display: false },
        title: {
          display: true,
          text: "Proficiency",
          font: { size: 16, family: "Share Tech Mono" },
        },
      },
      y: {
        ticks: { font: { size: 16, family: "Share Tech Mono" } },
        grid: { display: false, drawTicks: false, drawBorder: false },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Software Skill Overview",
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
