import { Review } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { postId } = params;

  try {
    connectToDb();

    const review = await Review.find({ postId });
    return NextResponse.json(review);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể tải được đánh giá!");
  }
};
