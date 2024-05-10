"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Setting } from "../models";
import { connectToDb } from "../utils";

export const updateLogo = async (formData) => {
  const { id } = Object.fromEntries(formData);
  const imgLogo = formData.get("imgLogo");
  const data = new FormData();
  data.append("file", imgLogo);
  data.append("upload_preset", "uploads");

  try {
    connectToDb();
    if (imgLogo.name === "undefined") {
      null;
    } else {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateFields = {
        imgLogo: url,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Setting.findByIdAndUpdate(id, updateFields);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật hình logo!");
  }

  revalidatePath("/dashboard/settings");
  redirect("/dashboard/settings");
};

export const updateBanner = async (formData) => {
  const { id } = Object.fromEntries(formData);
  const imgBanner = formData.get("imgBanner");
  const data = new FormData();
  data.append("file", imgBanner);
  data.append("upload_preset", "uploads");

  try {
    connectToDb();
    if (imgBanner.name === "undefined") {
      null;
    } else {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateFields = {
        imgBanner: url,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Setting.findByIdAndUpdate(id, updateFields);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật hình banner!");
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  redirect("/dashboard/settings");
};

export const updateSetting = async (formData) => {
  const { id, title, email, phone, address } = Object.fromEntries(formData);
  console.log(id, title, email, phone, address);

  try {
    connectToDb();
    const updateFields = {
      title,
      email,
      phone,
      address,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    console.log("Đã lưu vào cơ sở dữ liệu.");
    await Setting.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật cài đặt!");
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  redirect("/dashboard/settings");
};
