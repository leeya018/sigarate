"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";

const Main = () => {
  const [cigarettesLeft, setCigarettesLeft] = useState<number>(0);

  const checkReset = () => {
    const initialCigarettes = parseInt(
      localStorage.getItem("initialCigarettes") || "20",
      10
    ); // Handle null case by providing "0"
    const lastResetTime = localStorage.getItem("lastResetTime");
    const now = new Date();

    if (lastResetTime) {
      const lastResetDate = new Date(lastResetTime);
      const timePassed = now.getTime() - lastResetDate.getTime();
      // const oneDayInMs = 4 * 1000; // milliseconds in one day
      const oneDayInMs = 24 * 60 * 60 * 1000; // milliseconds in one day

      if (timePassed >= oneDayInMs) {
        // More than a day has passed, reset the cigarette count
        const decreaseAmount = parseInt(
          localStorage.getItem("decreaseAmount") || "0", // Handle null case by providing "0"
          10
        );
        const newCigarettesLeft =
          initialCigarettes - decreaseAmount > 0
            ? initialCigarettes - decreaseAmount
            : 0;
        setCigarettesLeft(newCigarettesLeft);

        localStorage.setItem("cigarettesLeft", newCigarettesLeft.toString());
        localStorage.setItem("initialCigarettes", newCigarettesLeft.toString());
        localStorage.setItem("lastResetTime", now.toISOString());
      } else {
        // Less than a day has passed, retrieve the remaining cigarettes from localStorage
        const storedCigarettes =
          parseInt(localStorage.getItem("cigarettesLeft") || "0", 10) ||
          initialCigarettes;
        setCigarettesLeft(storedCigarettes);
      }
    } else {
      // First time or reset hasn't been done yet, set the initial values
      setCigarettesLeft(initialCigarettes);
      localStorage.setItem("cigarettesLeft", initialCigarettes.toString());
      localStorage.setItem("lastResetTime", now.toISOString());
    }
  };

  useEffect(() => {
    checkReset();
  }, []);

  const handleDecrement = () => {
    checkReset(); // Re-check before decrementing to ensure reset logic is applied

    if (cigarettesLeft > 0) {
      const newCigarettesLeft = cigarettesLeft - 1;
      setCigarettesLeft(newCigarettesLeft);
      localStorage.setItem("cigarettesLeft", newCigarettesLeft.toString()); // Ensure value is stored as string
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col  text-white  ">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4">
          Cigarettes You Can Smoke Today:
        </h1>
        <div className="text-6xl font-bold -600 mb-6">{cigarettesLeft}</div>
        {cigarettesLeft > 0 && (
          <button
            onClick={handleDecrement}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Smoke 1
          </button>
        )}
      </main>
    </div>
  );
};

export default Main;
