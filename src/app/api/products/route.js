import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất sản phẩm!");
  }
};

export async function POST(request) {
  const {
    title,
    desc,
    info,
    img,
    category,
    brand,
    stock,
    views,
    price,
    costPrice,
  } = await request.json();
  await connectToDb();
  await Product.create({
    title,
    desc,
    info,
    img,
    category,
    brand,
    stock,
    views,
    price,
    costPrice,
  });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}
