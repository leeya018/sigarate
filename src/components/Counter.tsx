import React, { useEffect, useState } from "react";

type CounterType = {
  target: number;
};
export default function Counter({ target }: CounterType) {
  const [counter, setCounter] = useState<number>(target);

  useEffect(() => {
    const counterStr = localStorage.getItem("counter");
    if (counterStr) {
      setCounter(parseInt(counterStr));
    }

    return () => {};
  }, []);

  const handleClick = () => {
    setCounter((prev) => {
      if (prev > 0) {
        localStorage.setItem("counter", counter - 1 + "");
        return prev - 1;
      }

      return prev;
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex flex-col items-center text-6xl text-white bg-gray-300 bg-opacity-10 p-2 rounded-lg">
        <div className="mt-10 text-center">
          <span>You had left</span> <br />
          {counter} sigarates
        </div>
        <button
          disabled={counter == 0}
          className={` flex justify-center 
           text-white font-semibold border-white items-center 
          border-2 rounded-full 
            text-5xl h-20 w-20 mt-10 ${
              counter > 0 ? " bg-yellow-300" : "bg-gray-500 invisible"
            }`}
          onClick={handleClick}
        >
          +
        </button>
      </div>
    </div>
  );
}
