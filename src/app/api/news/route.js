import { Category, News } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();
    const news = await News.find();
    const category = await Category.find();
    return NextResponse.json(news, category);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

// export async function PUT(request) {
//   try {
//     const { id, title, desc } = await request.json();

//     // Validate and sanitize input data if necessary

//     await connectToDb();

//     // Assuming Product has a method to find and update by id
//     const news = await News.findById(id);
//     if (!news) {
//       return new Response(JSON.stringify({ message: "Product not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     news.title = title;
//     news.desc = desc;
//     await news.save();

//     return new Response(JSON.stringify({ message: "Product Updated" }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return new Response(JSON.stringify({ message: "Error updating product" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
