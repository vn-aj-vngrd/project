import { type NextPage } from "next";
import Chart from "../components/Core/Chart";
import Form from "../components/Core/Form";

const Home: NextPage = () => {
  return (
    <div className="flex w-full items-center justify-between space-x-10">
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
