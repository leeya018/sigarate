"use client";

import Counter from "@/components/Counter";
import React, { useEffect, useState } from "react";
import moment from "moment"; // Using moment for date manipulation

export default function MainPage() {
  const [target, setTarget] = useState(20);

  // Utility function to check if 2 minutes have passed and update the target accordingly
  const checkAndUpdateTarget = () => {
    const lastUpdatedStr = localStorage.getItem("lastUpdated");
    const currentTargetStr = localStorage.getItem("target");

    // Initialize with 22 if not already set
    let newTarget = currentTargetStr ? parseInt(currentTargetStr) : 20;

    if (lastUpdatedStr) {
      const lastUpdated = moment(lastUpdatedStr);
      const weeksPassed = moment().diff(lastUpdated, "weeks");

      // If 1 week or more has passed, decrease the target
      if (weeksPassed >= 1) {
        newTarget = Math.max(newTarget - 5 * weeksPassed, 0); // Decrease by 5 for every week that has passed

        localStorage.setItem("target", newTarget.toString());
        localStorage.setItem("lastUpdated", moment().format()); // Update the last updated timestamp
      }
    } else {
      // If no lastUpdated is present, set it to the current date
      localStorage.setItem("lastUpdated", moment().format());
    }

    setTarget(newTarget);
  };

  useEffect(() => {
    // Load the target and check for update every 2 minutes
    checkAndUpdateTarget();

    const interval = setInterval(() => {
      checkAndUpdateTarget();
    }, 60000); // Check every minute to ensure timely updates

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  console.log({ target });

  return (
    <div className="h-screen w-screen bg-sigarate">
      {/* <button
        className="text-xl font-semibold text-white"
        onClick={() => {
          setTarget((prev) => prev - 2);
          localStorage.removeItem("counter");
        }}
      >
        reset
      </button> */}
      <Counter target={target} />
    </div>
  );
}
