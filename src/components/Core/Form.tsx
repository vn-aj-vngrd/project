import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import currencies from "./Currencies";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { env } from "../../env/client.mjs";

type Inputs = {
  amount: number;
  date: Date;
};

const Form = () => {
  const [currencyFrom, setCurrencyFrom] = useState(currencies[0]);
  const [currencyTo, setCurrencyTo] = useState(currencies[1]);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  console.log(new Date().toISOString().substring(0, 10));

  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    formState: {
      //  errors
    },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const onCurrencyConvert = (amount: string) => {
    if (amount === "") {
      setConvertedAmount(0);
      return;
    }

    setIsConverting(true);
    const myHeaders = new Headers();
    myHeaders.append("apikey", env.NEXT_PUBLIC_API_KEY);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    // fetch(
    //   `https://api.apilayer.com/exchangerates_data/convert?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((res) => {
    //     setConvertedAmount(res.result);
    //     setIsConverting(false);
    //   })
    //   .catch((error) => console.log("error", error));
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Title
        </h2>
        <div className="mt-2 text-center text-sm text-gray-600">
          <p className="font-medium text-indigo-600 hover:text-indigo-500">
            Some Description
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700"
              >
                Currency
              </label>
              <div className="flex items-center justify-center space-x-2">
                <div className="mt-1 space-y-2">
                  <input
                    {...register("amount", {
                      required: {
                        value: true,
                        message: "Amount is required",
                      },
                    })}
                    placeholder="0.00"
                    onChange={(e) => {
                      if (e.target.value !== "") {
                        onCurrencyConvert(e.target.value);
                      } else {
                        setConvertedAmount(0);
                      }
                    }}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <select
                    className="rounded border p-1 text-sm"
                    defaultValue={currencyFrom}
                    onChange={(e) => setCurrencyFrom(e.target.value)}
                  >
                    {currencies.map((currency, index) => (
                      <option key={index}>{currency}</option>
                    ))}
                  </select>
                </div>

                {isConverting ? (
                  <div className="-mt-8">
                    <ArrowRightCircleIcon className="h-5 w-5 animate-spin fill-indigo-600" />
                  </div>
                ) : (
                  <div className="-mt-8">
                    <ArrowRightCircleIcon className="h-5 w-5 fill-indigo-600" />
                  </div>
                )}

                <div className="mt-1 space-y-2">
                  <input
                    value={convertedAmount}
                    type="number"
                    disabled
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />

                  <select
                    className="rounded border p-1 text-sm"
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

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <div className="mt-1">
                <input
                  {...register("date", {
                    required: {
                      value: true,
                      message: "Date is required",
                    },
                  })}
                  type="date"
                  min={new Date().toISOString().substring(0, 10)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
