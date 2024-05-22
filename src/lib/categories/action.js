"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDb } from "../utils";
import { Category } from "../models";

export const addCategory = async (formData) => {
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
    const newCategory = new Category({
      name,
      img_logo: url,
    });

    await newCategory.save();
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/categories");
  revalidatePath("/products");
  revalidatePath("/news");
  redirect("/dashboard/categories");
};

export const updateCategory = async (formData) => {
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
      updateFields.img_logo = url;
    }

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] === "" || updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    await Category.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.error(err);
    throw new Error("Không thể cập nhật danh mục!");
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/products");
  revalidatePath("/news");
  redirect("/dashboard/categories");
};

export const deleteCategory = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await Category.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/categories");
};
