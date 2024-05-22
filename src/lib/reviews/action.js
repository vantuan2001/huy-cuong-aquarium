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

export const deleteReview = async ({ id }) => {
  if (!id) {
    throw new Error("Cần có id để xóa");
  }

  try {
    await connectToDb();
    await Review.findByIdAndDelete(id);
  } catch (err) {
    console.error("Lỗi khi xóa đánh giá:", err);
    throw new Error("Không thể xóa đánh giá");
  }
  revalidatePath("/dashboard/reviews");
};
