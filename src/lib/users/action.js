"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDb } from "../utils";
import bcrypt from "bcrypt";
import { User } from "../models";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      isAdmin,
      address,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Tạo người dùng không thành công!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const updateFields = {
      username,
      email,
      phone,
      address,
      isAdmin,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Xóa người dùng không thành công!");
  }

  revalidatePath("/dashboard/users");
};
