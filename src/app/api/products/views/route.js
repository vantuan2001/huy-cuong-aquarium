import { Product } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export async function PUT(request) {
  try {
    const { id, views } = await request.json();

    // Xác thực và làm sạch dữ liệu đầu vào nếu cần

    await connectToDb();

    // Giả định rằng Product có một phương thức để tìm và cập nhật theo id
    const product = await Product.findById(id);
    if (!product) {
      return new Response(
        JSON.stringify({ message: "Không tìm thấy sản phẩm" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    product.views = views;
    await product.save();

    return new Response(
      JSON.stringify({ message: "Sản phẩm đã được cập nhật" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    return new Response(
      JSON.stringify({ message: "Lỗi khi cập nhật sản phẩm" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
