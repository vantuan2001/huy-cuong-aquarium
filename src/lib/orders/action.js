"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
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

  revalidatePath(`/dashboard/orders/${id}`);
};

export const cancelOrder = async ({ id }) => {
  if (!id) {
    throw new Error("Cần có id để huỷ");
  }

  try {
    await connectToDb();
    const updateFields = {
      status: 0,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.error("Lỗi khi huỷ đơn hàng:", err);
    throw new Error("Không thể huỷ đơn hàng");
  }

  revalidatePath("/dashboard/orders");
};

export const cancelPurchase = async ({ id }) => {
  if (!id) {
    throw new Error("Cần có id để huỷ");
  }

  try {
    await connectToDb();
    const updateFields = {
      status: 0,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.error("Lỗi khi huỷ đơn hàng:", err);
    throw new Error("Không thể huỷ đơn hàng");
  }

  revalidatePath(`/purchase/${id}`);
};
