import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
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

const Chart = () => {
  const context = useContext(AppContext);
  // console.log(context.dataPoints);

  const labels = context.dataPoints.map((dataPoint) => dataPoint.date) || [];

  const data = {
    labels,
    datasets: [
      {
        data: context.dataPoints.map((dataPoint) => dataPoint.rate) || [],
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <>
      {context.dataPoints.length > 0 && (
        <div className="h-[210px] w-[400px] rounded-lg bg-white p-1.5 shadow lg:h-[390px] lg:w-[750px]">
          <Line data={data} options={options} />
        </div>
      )}
    </>
  );
};

export default Chart;
