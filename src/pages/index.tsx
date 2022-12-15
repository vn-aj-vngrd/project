import { type NextPage } from "next";
import Chart from "../components/Core/Chart";
import Form from "../components/Core/Form";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-between space-x-0 space-y-6 lg:flex-row lg:space-y-0 lg:space-x-10">
        <div>
          <Form />
        </div>

        <div>
          <Chart />
        </div>
      </div>
    </>
  );
};

export default Home;
