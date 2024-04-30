"use client";

// import { useState } from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <RingLoader color="#36d7b7" loading size={80} />
    </div>
  );
};

export default Loading;
