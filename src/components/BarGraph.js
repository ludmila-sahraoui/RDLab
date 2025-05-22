import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import BarData from "../data/BarData.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarGraph() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            if (value >= 1000) return value / 1000 + "k";
            return value;
          },
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <Bar
      options={options}
      data={{
        labels: BarData.map((data) => data.label),
        datasets: [
          {
            label: "",
            data: BarData.map((data) => data.value),
            backgroundColor: [
              "#62B2FD",
              "#9BDFC4",
              "#EA79BA",
              "#FFB44F",
              "#44194A",
            ],
            borderWidth: 0,
            barThickness: 30,
          },
        ],
      }}
    />
  );
}
