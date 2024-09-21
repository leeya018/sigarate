"use client";

import Header from "@/components/Header";
import React, { useState } from "react";

const Settings = () => {
  const [hasChange, sethasChange] = useState(true);
  const [initialCigarettes, setInitialCigarettes] = useState<number>(
    parseInt(localStorage.getItem("initialCigarettes") || "12", 10) || 20 // Fallback to "12" if null
  );
  const [decreaseAmount, setDecreaseAmount] = useState<number>(
    parseInt(localStorage.getItem("decreaseAmount") || "1", 10) // Fallback to "1" if null
  );
  const [daysBetweenDecreases, setDaysBetweenDecreases] = useState<number>(
    parseInt(localStorage.getItem("daysBetweenDecreases") || "1", 10) // Fallback to "1" if null
  );

  const handleSave = () => {
    sethasChange(false);
    localStorage.setItem("initialCigarettes", initialCigarettes.toString()); // Ensure the value is stored as a string
    localStorage.setItem("decreaseAmount", decreaseAmount.toString()); // Ensure the value is stored as a string
    localStorage.setItem(
      "daysBetweenDecreases",
      daysBetweenDecreases.toString()
    ); // Ensure the value is stored as a string
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="mb-4 max-w-xs">
          <label className="block text-left font-semibold mb-2">
            Cigarettes per Day:
          </label>
          <input
            type="number"
            value={initialCigarettes}
            onChange={(e) => {
              setInitialCigarettes(parseInt(e.target.value, 10));
              sethasChange(true);
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4 max-w-xs">
          <label className="block text-left font-semibold mb-2">
            Decrease per Cycle:
          </label>
          <input
            type="number"
            value={decreaseAmount}
            onChange={(e) => {
              setDecreaseAmount(parseInt(e.target.value, 10));
              sethasChange(true);
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-6 max-w-xs">
          <label className="block text-left font-semibold mb-2">
            Days between Decreases:
          </label>
          <input
            type="number"
            value={daysBetweenDecreases}
            onChange={(e) => {
              setDaysBetweenDecreases(parseInt(e.target.value, 10));
              sethasChange(true);
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleSave}
          className={`${
            hasChange ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 "
          }  text-white px-6 py-3 rounded-lg font-semibold`}
        >
          Save
        </button>
      </main>
    </div>
  );
};

export default Settings;
