import { type AppType } from "next/dist/shared/lib/utils";
import { useState } from "react";
import type { DataPoints } from "../types";
import Layout from "../components/Common/Layout";
import { AppContext } from "../context/AppContext";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [dataPoints, setDataPoints] = useState<DataPoints[]>([]);

  return (
    <AppContext.Provider value={{ dataPoints, setDataPoints }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
};

export default MyApp;
