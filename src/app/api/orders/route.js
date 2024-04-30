import { Order } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();

    const products = await Order.find();
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất sản phẩm!");
  }
};

export async function POST(request) {
  const {
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    paymentStatus,
    total,
    userId,
    codeBill,
  } = await request.json();
  await connectToDb();
  await Order.create({
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    paymentStatus,
    total,
    userId,
    codeBill,
  });
  return NextResponse.json(
    { message: "Sản phẩm đã được tạo mới" },
    { status: 201 }
  );
}

// export const POST = async (request) => {
//   try {
//     connectToDb();
//     const product = await Product.create(request.body);

//     return NextResponse.json(product);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Không thể truy xuất sản phẩm!");
//   }
// };

// export const POST = async (req) => {
//   try {
//     connectToDb();
//     const body = await req.json();
//     const products = await Product.create({
//       data: { ...body },
//     });

//     return new NextResponse(JSON.stringify(products, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Đã xảy ra lỗi!" }, { status: 500 })
//     );
//   }
// };

// export async function POST(request) {
//   // const product = await Product.create(request.body);
//   // const body = await request.json(request.body);
//   // await connectToDb();
//   // await Product.create({
//   //   ...body,
//   // });
//   // return NextResponse.json({ message: "Product Created" }, { status: 201 });

//   try {
//     const body = await request.json(request.body);
//     await connectToDb();
//     await Product.create({
//       ...body,
//     });
//     return NextResponse.json({ message: "Product Created" }, { status: 201 });
//   } catch (err) {
//     console.log(err);
//     throw new Error("Không thể truy xuất sản phẩm!");
//   }
// }

// if (method === "POST") {
//   if (!token || token !== process.env.token) {
//     return res.status(401).json("Not authenticated!");
//   }
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }
// }
