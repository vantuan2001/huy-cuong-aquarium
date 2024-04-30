import { updateBrand } from "@/lib/action";
import { Brand } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// export async function PUT(request) {
//   const {
//     id,
//     name,
//     img,

//   } = await request.json();
//   await connectToDb();
//   await Brand.create({
//     id,
//     name,
//     img,
//   });
//   return NextResponse.json({ message: "Product Created" }, { status: 201 });
// }

export async function POST(request) {
  try {
    const { name, img } = await request.json();

    await connectToDb();

    await Brand.create({
      name,
      img,
    });

    return NextResponse.json({ message: "Brand Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating brand:", error);
    return NextResponse.json(
      { message: "Failed to create brand" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const { id, name } = await request.json();
  try {
    await connectToDb();
    await Brand.findByIdAndUpdate(id, name, {
      new: true,
    });
    return NextResponse.json({ message: "Brand Created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to update brand" },
      { status: 500 }
    );
  }

  // try {
  //   const { id, name } = await request.json();

  //   await connectToDb();
  //   updateBrand(id, name);

  //   return NextResponse.json({ message: "Brand updated" }, { status: 200 });
  // } catch (error) {
  //   console.error("Error updating brand:", error);
  //   return NextResponse.json(
  //     { message: "Failed to update brand" },
  //     { status: 500 }
  //   );
  // }
}
