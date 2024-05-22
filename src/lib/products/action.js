"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDb } from "../utils";
import { Product } from "../models";

export const addProduct = async (formData) => {
  const { title, desc, info, category, brand, stock, price, costPrice } =
    Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );

    const { url } = uploadRes.data;
    await connectToDb();
    const newProduct = new Product({
      title,
      costPrice,
      price,
      stock,
      info,
      desc,
      category,
      brand,
      img: url,
    });
    console.log("save data");
    await newProduct.save();
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const {
    id,
    title,
    costPrice,
    price,
    stock,
    sold,
    views,
    info,
    desc,
    category,
    brand,
  } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");

  try {
    await connectToDb();
    let updateFields = {
      title,
      costPrice,
      price,
      stock,
      sold,
      views,
      info,
      desc,
      category,
      brand,
    };
    if (file && file.name !== "undefined") {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      updateFields.img = url;
    }

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật sản phẩm!");
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await Product.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/products");
};
