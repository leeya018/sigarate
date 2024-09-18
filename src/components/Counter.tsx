import React, { useEffect, useState } from "react";

// Utility function to get the current date in DD-MM-YYYY format
const getCurrentDate = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

type CounterType = {
  target: number;
};

type CigaretteLog = {
  date: string;
  counter: number;
};

export default function Counter({ target }: CounterType) {
  const [counter, setCounter] = useState<number>(target);

  useEffect(() => {
    // Load the latest counter for today from localStorage
    const cigaretteLogsStr = localStorage.getItem("cigaretteLogs");
    if (cigaretteLogsStr) {
      const cigaretteLogs: CigaretteLog[] = JSON.parse(cigaretteLogsStr);
      const todayLog = cigaretteLogs.find(
        (log) => log.date === getCurrentDate()
      );
      if (todayLog) {
        setCounter(todayLog.counter);
      }
    }
  }, [target]);

  const handleClick = () => {
    setCounter((prev) => {
      if (prev > 0) {
        const newCounter = prev - 1;

        // Load the existing logs from localStorage
        const cigaretteLogsStr = localStorage.getItem("cigaretteLogs");
        const cigaretteLogs: CigaretteLog[] = cigaretteLogsStr
          ? JSON.parse(cigaretteLogsStr)
          : [];

        // Find today's log if it exists, or create a new one
        const today = getCurrentDate();
        const todayLogIndex = cigaretteLogs.findIndex(
          (log) => log.date === today
        );

        if (todayLogIndex !== -1) {
          // Update today's log
          cigaretteLogs[todayLogIndex].counter = newCounter;
        } else {
          // Create a new log for today
          cigaretteLogs.push({ date: today, counter: newCounter });
          localStorage.setItem("target", target - 2 + "");
        }

        // Save the updated logs back to localStorage
        localStorage.setItem("cigaretteLogs", JSON.stringify(cigaretteLogs));

        return newCounter;
      }
      return prev;
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center text-6xl text-white bg-gray-300 bg-opacity-10 p-2 rounded-lg">
        <div className="mt-10 text-center">
          <span>You have</span> <br />
          {counter} cigarettes left
        </div>
        <button
          disabled={counter === 0}
          className={`flex justify-center text-white font-semibold border-white items-center 
            border-2 rounded-full text-5xl h-20 w-20 mt-10 ${
              counter > 0 ? "bg-yellow-300" : "bg-gray-500 invisible"
            }`}
          onClick={handleClick}
        >
          -
        </button>
      </div>
    </div>
  );
}
