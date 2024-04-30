import { Category } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();
    const category = await Category.find();
    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
