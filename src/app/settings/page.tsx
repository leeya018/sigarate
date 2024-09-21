"use client";

import Header from "@/components/Header";
import React, { useState } from "react";

const Settings = () => {
  const [initialCigarettes, setInitialCigarettes] = useState(
    parseInt(localStorage.getItem("initialCigarettes"), 10) || 12
  );
  const [decreaseAmount, setDecreaseAmount] = useState(
    parseInt(localStorage.getItem("decreaseAmount"), 10) || 1
  );
  const [daysBetweenDecreases, setDaysBetweenDecreases] = useState(
    parseInt(localStorage.getItem("daysBetweenDecreases"), 10) || 1
  );

  const handleSave = () => {
    localStorage.setItem("initialCigarettes", initialCigarettes);
    localStorage.setItem("decreaseAmount", decreaseAmount);
    localStorage.setItem("daysBetweenDecreases", daysBetweenDecreases);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="mb-4  max-w-xs">
          <label className="block text-left font-semibold mb-2">
            Cigarettes per Day:
          </label>
          <input
            type="number"
            value={initialCigarettes}
            onChange={(e) => setInitialCigarettes(parseInt(e.target.value, 10))}
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
            onChange={(e) => setDecreaseAmount(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-6  max-w-xs">
          <label className="block text-left font-semibold mb-2">
            Days between Decreases:
          </label>
          <input
            type="number"
            value={daysBetweenDecreases}
            onChange={(e) =>
              setDaysBetweenDecreases(parseInt(e.target.value, 10))
            }
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save
        </button>
      </main>
    </div>
  );
};

export default Settings;
