"use client";

// import { useState } from "react";
import { BarLoader, ClipLoader, RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <h2>HUY CƯỜNG AQUARIUM</h2>
      <BarLoader color="#36d7b7" height={10} width={200} />
    </div>
  );
};

export default Loading;
