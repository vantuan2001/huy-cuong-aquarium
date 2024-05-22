"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Brand } from "../models";
import { connectToDb } from "../utils";

export const addBrand = async (formData) => {
  const { name } = Object.fromEntries(formData);
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
    connectToDb();
    const newBrand = new Brand({
      name,
      img: url,
    });

    await newBrand.save();
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/brands");
  redirect("/dashboard/brands");
};

export const updateBrand = async (formData) => {
  const { id, name } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");

  try {
    await connectToDb();

    let updateFields = { name };
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

    await Brand.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.error(err);
    throw new Error("Không thể cập nhật thương hiệu!");
  }
  revalidatePath("/dashboard/brands");
  revalidatePath("/products");
  redirect("/dashboard/brands");
};

export const deleteBrand = async ({ id }) => {
  if (!id) {
    throw new Error("Cần có id để xóa");
  }

  try {
    await connectToDb();
    await Brand.findByIdAndDelete(id);
  } catch (err) {
    console.error("Lỗi khi xóa thương hiệu:", err);
    throw new Error("Không thể xóa thương hiệu");
  }
  revalidatePath("/dashboard/brands");
};
