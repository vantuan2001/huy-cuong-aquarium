import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const regex = new RegExp(title, "i");

    const products = await Product.find({
      title: { $regex: regex },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Không thể lấy thông tin sản phẩm!"));
  }
};

export const dynamic = "force-dynamic";
