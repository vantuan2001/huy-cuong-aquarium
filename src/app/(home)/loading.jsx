"use client";

// import { useState } from "react";
import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <h2>HUY CƯỜNG AQUARIUM</h2>
      <BarLoader color="#9acf78" height={10} width={300} />
    </div>
  );
};

export default Loading;
