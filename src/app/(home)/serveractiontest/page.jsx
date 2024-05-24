"use client";

import { fetchProduct } from "@/lib/products/data";
import FormTest from "./formTest";
import axios from "axios";
import { useEffect, useState } from "react";
import Address from "@/components/address/address";
import Accordion from "./Accordion";
// import address from "@/components/address/address";

const ServerActionTestPage = () => {
  // const {
  //   getProvince,
  //   getDistrict,
  //   getWard,
  //   SelectProvince,
  //   SelectDistrict,
  //   SelectWard,
  //   SelectForm,
  // } = Address();
  // Dummy product data
  const productDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in malesuada eleifend.";
  const productReviews = "Excellent product! Loved it.";
  return (
    <div>
      <h1>Product Detail</h1>
      <Accordion description={productDescription} reviews={productReviews} />
    </div>

    // <div>
    //   <h1>My Accordion Example</h1>
    //   <Accordion title="Section 1" content="Content for section 1" />
    //   <Accordion title="Section 2" content="Content for section 2" />
    //   <Accordion title="Section 3" content="Content for section 3" />
    // </div>
    // <div>
    //   {getProvince}
    //   {getDistrict}
    //   {getWard}
    //   <SelectForm />
    //   {/* <SelectDistrict />
    //   <SelectWard /> */}
    // </div>
  );
};
export default ServerActionTestPage;
