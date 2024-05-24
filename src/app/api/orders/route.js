import { Order } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();

    const products = await Order.find();
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất sản phẩm!");
  }
};

export async function POST(request) {
  const {
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    paymentStatus,
    total,
    userId,
    codeBill,
  } = await request.json();
  await connectToDb();
  await Order.create({
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    paymentStatus,
    total,
    userId,
    codeBill,
  });
  return NextResponse.json(
    { message: "Sản phẩm đã được tạo mới" },
    { status: 201 }
  );
}

export default function handler(req, res) {
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

  const data = { message: "Đây là một phản hồi mẫu" };
  res.status(200).json(data);
}
