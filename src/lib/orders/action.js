"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDb } from "../utils";
import { Order } from "../models";

export const addOrder = async (formData) => {
  const {
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    total,
    userId,
  } = Object.fromEntries(formData);
  console.log(
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    total,
    userId
  );
  // try {
  //   connectToDb();
  //   const newOrder = new Order({
  //     username,
  //     phone,
  //     email,
  //     address,
  //     products,
  //     note,
  //     paymentMethods,

  //     total,
  //     userId,
  //   });

  //   await newOrder.save();
  // } catch (err) {
  //   console.log(err);
  // }
  // revalidatePath("/dashboard/order");
  // redirect("/dashboard/order");
};

export const deleteOrder = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Order.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/orders");
};

export const updateStatusOrder = async (formData) => {
  const { id, status } = Object.fromEntries(formData);
  try {
    connectToDb();
    const updateFields = {
      status: 1 + +status,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật đơn hàng!");
  }

  revalidatePath("/dashboard/orders");
  redirect("/dashboard/orders");
};

export const cancelOrder = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    const updateFields = {
      status: 0,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    console.log("Đã lưu vào cơ sở dữ liệu.");
    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể huỷ đơn hàng!");
  }
  revalidatePath("/dashboard/orders");
};
