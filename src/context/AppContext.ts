import { createContext } from "react";
import type { DataPoints } from "../types";

export const AppContext = createContext({
  dataPoints: [] as DataPoints[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setDataPoints: (dataPoints: DataPoints[]) => {},
});
