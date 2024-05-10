"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDb } from "../utils";
import { News } from "../models";

export const addNews = async (formData) => {
  const { title, desc } = Object.fromEntries(formData);
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
    const newNews = new News({
      title,
      desc,
      img: url,
    });

    await newNews.save();
    console.log("Đã lưu vào cơ sở dữ liệu.");
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  redirect("/dashboard/news");
};

export const updateNews = async (formData) => {
  const { id, title, desc } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    connectToDb();
    if (file.name === "undefined") {
      const updateFields = {
        title,
        desc,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await News.findByIdAndUpdate(id, updateFields);
    } else {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateFields = {
        title,
        desc,
        img: url,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await News.findByIdAndUpdate(id, updateFields);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật tin tức!");
  }

  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  redirect("/dashboard/news");
};

export const deleteNews = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await News.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/news");
  revalidatePath("/news");
};
