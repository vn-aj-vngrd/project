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
  const [isLoading, setIsLoading] = useState(false);

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
          Exchange Rate
        </h2>
        <div className="mt-2 text-center text-sm text-gray-600">
          <p className="font-medium text-indigo-600 hover:text-indigo-500">
            Predict what&apos;s ahead
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Currency */}
            <div className="pb-10">
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700"
              >
                Currency
              </label>
              <div className="flex items-center justify-center space-x-4">
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
                    className="absolute rounded border p-1 text-xs placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    defaultValue={currencyFrom}
                    onChange={(e) => setCurrencyFrom(e.target.value)}
                  >
                    {currencies.map((currency, index) => (
                      <option key={index}>{currency}</option>
                    ))}
                  </select>
                </div>

                {isConverting ? (
                  <ArrowRightCircleIcon className="h-7 w-7 animate-spin fill-indigo-600" />
                ) : (
                  <ArrowRightCircleIcon className="h-7 w-7 fill-indigo-600" />
                )}

                <div className="mt-1 space-y-2">
                  <input
                    value={convertedAmount}
                    type="number"
                    disabled
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />

                  <select
                    className="absolute rounded border p-1 text-xs shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
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

            {/* Button */}
            <div>
              <button
                type="submit"
                className="flex w-full items-center justify-center space-x-3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
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
                <p> {isLoading ? <>Loading</> : <>Submit</>}</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
