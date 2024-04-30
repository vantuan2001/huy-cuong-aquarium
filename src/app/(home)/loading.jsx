"use client";

// import { useState } from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <RingLoader color="#9acf78" loading size={80} />
    </div>
  );
};

export default Loading;
