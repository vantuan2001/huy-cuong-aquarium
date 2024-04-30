import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
// import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { id, sold, stock } = await request.json();

    // Validate and sanitize input data if necessary

    await connectToDb();

    // Assuming Product has a method to find and update by id
    const product = await Product.findById(id);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Update product attributes
    product.sold = sold;
    product.stock = stock;
    await product.save();

    return new Response(JSON.stringify({ message: "Product Updated" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ message: "Error updating product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
