"use client";

import Counter from "@/components/Counter";
import React, { useEffect, useState } from "react";
const TARGET = 20;

export default function MainPage() {
  const [target, setTarget] = useState(TARGET);

  useEffect(() => {
    const targetStr = localStorage.getItem("target");
    if (targetStr) {
      setTarget(parseInt(targetStr));
    }

    return () => {};
  }, []);

  return (
    <div className="h-screen w-screen bg-sigarate ">
      <Counter target={target} />
    </div>
  );
}
