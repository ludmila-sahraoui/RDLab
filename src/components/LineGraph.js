import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LineData from "../data/LineData.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraph() {
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
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
  };
  return (
    <Line
      options={options}
      data={{
        labels: LineData.map((data) => data.label),
        datasets: [
          {
            label: "Last 30 Days",
            data: LineData.map((data) => data.activeUsers),
            borderColor: "#44194A",
            backgroundColor: "rgba(68, 25, 74, 1)",
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      }}
    />
  );
}
