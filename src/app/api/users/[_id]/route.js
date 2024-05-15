import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    connectToDb();
    const user = await User.findOne({ id });
    return NextResponse.json(user);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch news!");
  }
};
