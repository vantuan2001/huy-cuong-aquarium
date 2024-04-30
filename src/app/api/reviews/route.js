import { Review } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();
    const reviews = await Review.find();
    return NextResponse.json(reviews);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể tải được danh sách đánh giá!");
  }
};

export async function POST(request) {
  const { rating, username, email, comment, postId, userId } =
    await request.json();
  await connectToDb();
  await Review.create({
    rating,
    username,
    email,
    comment,
    postId,
    userId,
  });
  return NextResponse.json(
    { message: "Đánh giá đã được tạo" },
    { status: 201 }
  );
}
