/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import currencies from "../../data/Currencies";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import { env } from "../../env/client.mjs";
import type { DataPoints } from "../../types";

type Inputs = {
  amount: number;
  date: string;
};

const Form = () => {
  const [currencyFrom, setCurrencyFrom] = useState(currencies[0]);
  const [currencyTo, setCurrencyTo] = useState(currencies[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    const start_date = moment()
      .subtract(6, "days")
      .toISOString()
      .substring(0, 10);
    const end_date = moment().toISOString().substring(0, 10);
    const base = currencyFrom;
    const symbols = currencyTo;

    console.log(start_date, end_date);
    console.log(base, symbols);

    const myHeaders = new Headers();
    myHeaders.append("apikey", env.NEXT_PUBLIC_API_KEY);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${start_date}&end_date=${end_date}&base=${base}&symbols=${symbols}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        const data_points = Object.entries(
          result.rates as { [date: string]: { [currency: string]: number } }
        ).map(([date, rate]) => {
          const timestamp = new Date(date).valueOf() as number;
          const currency = Object.keys(rate)[0] as string;
          const value = rate[currency as string] as number;
          return { date, timestamp, value };
        });

        dividedDifference(data_points, data.date);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error);
        setIsLoading(false);
      });
  };

  const dividedDifference = (data_points: DataPoints[], date: string) => {
    if (data_points && data_points.length > 0) {
      console.log(data_points, date);

      const A = data_points[0]!.value;

      const B =
        (data_points[1]!.value - A) /
        (data_points[1]!.timestamp - data_points[0]!.timestamp);

      const C =
        ((data_points[2]!.value - data_points[1]!.value) /
          (data_points[2]!.timestamp - data_points[1]!.timestamp) -
          B) /
        (data_points[2]!.timestamp - data_points[0]!.timestamp);

      const D =
        ((data_points[3]!.value - data_points[2]!.value) /
          (data_points[3]!.timestamp - data_points[2]!.timestamp) -
          C -
          B) /
        (data_points[3]!.timestamp - data_points[0]!.timestamp);

      const E =
        ((data_points[4]!.value - data_points[3]!.value) /
          (data_points[4]!.timestamp - data_points[3]!.timestamp) -
          D -
          C -
          B) /
        (data_points[4]!.timestamp - data_points[0]!.timestamp);

      const F =
        ((data_points[5]!.value - data_points[4]!.value) /
          (data_points[5]!.timestamp - data_points[4]!.timestamp) -
          E -
          D -
          C -
          B) /
        (data_points[5]!.timestamp - data_points[0]!.timestamp);

      const G =
        ((data_points[6]!.value - data_points[5]!.value) /
          (data_points[6]!.timestamp - data_points[5]!.timestamp) -
          F -
          E -
          D -
          C -
          B) /
        (data_points[6]!.timestamp - data_points[0]!.timestamp);

      const P = moment(date).valueOf();

      const result =
        A +
        B * (P - data_points[0]!.timestamp) +
        C * (P - data_points[0]!.timestamp) * (P - data_points[1]!.timestamp) +
        D *
          (P - data_points[0]!.timestamp) *
          (P - data_points[1]!.timestamp) *
          (P - data_points[2]!.timestamp) +
        E *
          (P - data_points[0]!.timestamp) *
          (P - data_points[1]!.timestamp) *
          (P - data_points[2]!.timestamp) *
          (P - data_points[3]!.timestamp) +
        F *
          (P - data_points[0]!.timestamp) *
          (P - data_points[1]!.timestamp) *
          (P - data_points[2]!.timestamp) *
          (P - data_points[3]!.timestamp) *
          (P - data_points[4]!.timestamp) +
        G *
          (P - data_points[0]!.timestamp) *
          (P - data_points[1]!.timestamp) *
          (P - data_points[2]!.timestamp) *
          (P - data_points[3]!.timestamp) *
          (P - data_points[4]!.timestamp) *
          (P - data_points[5]!.timestamp);

      console.log(result);
    }
  };

  return (
    <>
      <div className="rounded-lg bg-white p-10 shadow">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Currency */}
          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Currency
            </label>
            <div className="mt-2 flex items-center justify-between space-x-6">
              <div className="pace-y-2">
                <select
                  className="select"
                  defaultValue={currencyFrom}
                  onChange={(e) => setCurrencyFrom(e.target.value)}
                >
                  {currencies.map((currency, index) => (
                    <option key={index}>{currency}</option>
                  ))}
                </select>
              </div>

              <ArrowRightCircleIcon className="h-6 w-6 fill-indigo-600" />

              <div className="space-y-2">
                <select
                  className="select"
                  defaultValue={currencyTo}
                  onChange={(e) => setCurrencyTo(e.target.value)}
                >
                  {currencies
                    .filter((cur) => cur !== currencyFrom)
                    .map((currency, index) => (
                      <option key={index}>{currency}</option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <div className="mt-2">
              <input
                {...register("date", {
                  required: {
                    value: true,
                    message: "Date is required",
                  },
                })}
                type="date"
                min={moment().toISOString().substring(0, 10)}
                className="date"
              />
            </div>
            {errors.date && (
              <div className="mt-2 text-xs text-red-500">
                {errors.date.message}
              </div>
            )}
          </div>

          {/* Button */}
          <div>
            <button type="submit" className="button">
              <div>
                {isLoading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin fill-green-500 text-gray-200"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p> {isLoading ? <>Loading</> : <>Start</>}</p>
            </button>
          </div>

          {error && <div className="text-sm text-red-500">Error: {error}</div>}
        </form>
      </div>
    </>
  );
};

export default Form;
