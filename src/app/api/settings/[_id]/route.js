import { Setting } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { _id } = params;

  try {
    connectToDb();

    const news = await Setting.findById({ _id });
    return NextResponse.json(news);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch news!");
  }
};
