"use server";

import { revalidatePath } from "next/cache";
import { connectToDb } from "../utils";
import { Review } from "../models";

export const addReview = async (formData) => {
  const { rating, username, email, comment, postId, userId } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const newReview = new Review({
      rating,
      username,
      email,
      comment,
      postId,
      userId,
    });
    console.log("save data");
    await newReview.save();
  } catch (err) {
    console.log(err);
  }
};

export const deleteReview = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Review.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/reviews");
};
