"use client";

import Header from "@/components/Header";
import React, { useState, useEffect } from "react";

const Settings = () => {
  const [hasChange, setHasChange] = useState(true);
  const [initialCigarettes, setInitialCigarettes] = useState<number>(12);
  const [decreaseAmount, setDecreaseAmount] = useState<number>(1);
  const [daysBetweenDecreases, setDaysBetweenDecreases] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running on client-side
      const storedInitialCigarettes = localStorage.getItem("initialCigarettes");
      const storedDecreaseAmount = localStorage.getItem("decreaseAmount");
      const storedDaysBetweenDecreases = localStorage.getItem(
        "daysBetweenDecreases"
      );

      if (storedInitialCigarettes) {
        setInitialCigarettes(parseInt(storedInitialCigarettes, 10));
      }
      if (storedDecreaseAmount) {
        setDecreaseAmount(parseInt(storedDecreaseAmount, 10));
      }
      if (storedDaysBetweenDecreases) {
        setDaysBetweenDecreases(parseInt(storedDaysBetweenDecreases, 10));
      }
    }
  }, []);

  const handleSave = () => {
    setHasChange(false);
    if (typeof window !== "undefined") {
      // Ensure running on client-side
      localStorage.setItem("initialCigarettes", initialCigarettes.toString());
      localStorage.setItem("decreaseAmount", decreaseAmount.toString());
      localStorage.setItem(
        "daysBetweenDecreases",
        daysBetweenDecreases.toString()
      );
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col text-white">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl font-bold mb-6">הגדרות</h1>
        <div className="mb-4 max-w-xs">
          <label className="block text-right font-semibold mb-2">
            :מספר סיגריות ליום
          </label>
          <input
            type="number"
            value={initialCigarettes}
            onChange={(e) => {
              setInitialCigarettes(parseInt(e.target.value, 10));
              localStorage.setItem(
                "cigarettesLeft",
                parseInt(e.target.value, 10).toString()
              );
              setHasChange(true);
            }}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>
        <div className="mb-4 max-w-xs">
          <label className="block text-right font-semibold mb-2">
            :כמות סיגריות להפחתה
          </label>
          <input
            type="number"
            value={decreaseAmount}
            onChange={(e) => {
              setDecreaseAmount(parseInt(e.target.value, 10));
              setHasChange(true);
            }}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>
        <div className="mb-6 max-w-xs">
          <label className="block text-right font-semibold mb-2">
            :כמות ימים לכל הפחתה
          </label>
          <input
            type="number"
            value={daysBetweenDecreases}
            onChange={(e) => {
              setDaysBetweenDecreases(parseInt(e.target.value, 10));
              setHasChange(true);
            }}
            className="w-full px-3 py-2 border rounded-lg text-black"
          />
        </div>
        <button
          onClick={handleSave}
          className={`${
            hasChange ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600"
          } text-white px-6 py-3 rounded-lg font-semibold`}
        >
          שמור
        </button>
      </main>
    </div>
  );
};

export default Settings;
