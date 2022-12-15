import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Exchange Rate Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5],
      borderColor: "#6366f1",
      backgroundColor: "#6366f1",
    },
  ],
};

const Chart = () => {
  return (
    <div>
      <Line
        data={data}
        options={options}
        width={100}
        height={50}
        className="h-[1000px] w-[1000px] rounded-lg bg-white p-2 shadow"
      />
    </div>
  );
};

export default Chart;
