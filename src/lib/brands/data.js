import { Brand } from "../models";
import { connectToDb } from "../utils";

export const fetchBrands = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;
  try {
    await connectToDb(); // Connect to database
    const count = await Brand.countDocuments({ name: { $regex: regex } }); // Use countDocuments method instead of count
    const brands = await Brand.find({ name: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, brands };
  } catch (error) {
    console.log(error);
    throw new Error("Không thể truy xuất thương hiệu!");
  }
};

export const getBrands = async () => {
  try {
    await connectToDb();
    const brands = await Brand.find().sort({ createdAt: -1 });
    return brands;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất thương hiệu!");
  }
};

export const fetchBrand = async (id) => {
  try {
    connectToDb();
    const brand = await Brand.findById(id);
    return brand;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất thương hiệu!");
  }
};
