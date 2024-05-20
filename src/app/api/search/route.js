import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const url = new URL(request.nextUrl);
    const { searchParams } = url;
    const name = searchParams.get("title");
    // const titleQuery = searchParams.searchParams.get("title");
    const regex = new RegExp(name, "i");

    const products = await Product.find({
      title: { $regex: regex },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Unable to retrieve products!"));
  }
};

export const dynamic = "auto";
