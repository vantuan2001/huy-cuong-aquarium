import { News } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { title } = params;

  try {
    connectToDb();

    const news = await News.findOne({ title });
    return NextResponse.json(news);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch news!");
  }
};

// export const DELETE = async (request, { params }) => {
//   const { slug } = params;

//   try {
//     connectToDb();

//     await Post.deleteOne({ slug });
//     return NextResponse.json("Post deleted");
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete post!");
//   }
// };
