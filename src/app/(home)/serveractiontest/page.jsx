"use client";

import { fetchProduct } from "@/lib/products/data";
import FormTest from "./formTest";
import axios from "axios";
import { useEffect, useState } from "react";
import Address from "@/components/address/address";
// import address from "@/components/address/address";

const ServerActionTestPage = () => {
  const {
    getProvince,
    getDistrict,
    getWard,
    SelectProvince,
    SelectDistrict,
    SelectWard,
    SelectForm,
  } = Address();
  return (
    <div>
      {getProvince}
      {getDistrict}
      {getWard}
      <SelectForm />
      {/* <SelectDistrict />
      <SelectWard /> */}
    </div>
  );
};
export default ServerActionTestPage;
