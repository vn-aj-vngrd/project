import { type NextPage } from "next";
import { useContext } from "react";
import Chart from "../components/Core/Chart";
import Form from "../components/Core/Form";
import { AppContext } from "../context/AppContext";

const Home: NextPage = () => {
  const context = useContext(AppContext);

  return (
    <div
      className={`flex w-full flex-col items-center justify-between py-10 lg:flex-row ${
        context.dataPoints.length > 0
          ? "space-y-6 space-x-0 lg:space-x-10 lg:space-y-0"
          : ""
      }`}
    >
      <div>
        <Form />
      </div>

      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
