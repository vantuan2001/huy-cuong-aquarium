import { Brand } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();
    const brands = await Brand.find();
    return NextResponse.json(brands);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
