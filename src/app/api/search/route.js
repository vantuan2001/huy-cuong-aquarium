import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();

    const { searchParams } = new URL(request.url);
    const titleQuery = searchParams.get("title");
    const regex = new RegExp(titleQuery, "i");

    const products = await Product.find({
      title: { $regex: regex },
    });
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất sản phẩm!");
  }
};
