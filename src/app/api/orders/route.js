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
  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://www.huycuongaquarium.online"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const data = { message: "This is a sample response" };
  res.status(200).json(data);
}
