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
import { useContext } from "react";
import AppContext from "../../context/AppContext";

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
  const context = useContext(AppContext);
  console.log(context);

  return (
    <div className="w-[400px] h-[210px] rounded-lg bg-white p-1.5 shadow lg:w-[750px] lg:h-[390px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
