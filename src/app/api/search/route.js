import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// Helper function to set CORS headers
function setCorsHeaders(response) {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://www.huycuongaquarium.online"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

// Handle GET requests
export const GET = async (request) => {
  try {
    await connectToDb();
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    const regex = new RegExp(title, "i");

    const products = await Product.find({
      title: { $regex: regex },
    });

    let response = NextResponse.json(products);
    return setCorsHeaders(response);
  } catch (err) {
    console.error(err);
    let response = NextResponse.error(
      new Error("Không thể lấy thông tin sản phẩm!")
    );
    return setCorsHeaders(response);
  }
};

// Handle OPTIONS requests for CORS preflight
export const OPTIONS = async () => {
  let response = new NextResponse(null, { status: 200 });
  return setCorsHeaders(response);
};

// Indicate that the response should be dynamically generated
export const dynamic = "force-dynamic";
