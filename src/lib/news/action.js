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
    await connectToDb();
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );

    const { url } = uploadRes.data;
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
    await connectToDb();
    let updateFields = { title, desc };
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

    await News.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.error(err);
    throw new Error("Không thể cập nhật tin tức!");
  }
  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  redirect("/dashboard/news");
};

export const deleteNews = async ({ id }) => {
  if (!id) {
    throw new Error("Cần có id để xóa");
  }

  try {
    await connectToDb();
    await News.findByIdAndDelete(id);
  } catch (err) {
    console.error("Lỗi khi xóa tin tức:", err);
    throw new Error("Không thể xóa tin tức");
  }
  revalidatePath("/dashboard/news");
  revalidatePath("/news");
};
