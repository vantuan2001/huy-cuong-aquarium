import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { category } = params;

  try {
    connectToDb();

    const product = await Product.find({ category });
    return NextResponse.json(product);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};
