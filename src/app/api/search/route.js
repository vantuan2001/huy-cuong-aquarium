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

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const data = { message: "This is a sample response" };
  res.status(200).json(data);
}
