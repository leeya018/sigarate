"use client";

import Counter from "@/components/Counter";
import React, { useEffect, useState } from "react";

export default function MainPage() {
  const [target, setTarget] = useState(20);

  useEffect(() => {
    // Load the target from localStorage on initial mount
    const targetStr = localStorage.getItem("target");
    if (targetStr) {
      setTarget(parseInt(targetStr));
    } else {
      localStorage.setItem("target", "22");
    }
  }, []);

  console.log({ target });
  return (
    <div className="h-screen w-screen bg-sigarate">
      {/* <button
        className="
      text-xl font-semibold text-white"
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
