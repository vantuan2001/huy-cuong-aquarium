import { Category } from "../models";
import { connectToDb } from "../utils";

export const getCategories = async () => {
  try {
    connectToDb();
    const categories = await Category.find();
    return categories;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất danh mục!");
  }
};

export const fetchCategories = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;
  try {
    connectToDb();
    const count = await Category.find({ name: { $regex: regex } }).count();
    const categories = await Category.find({ name: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, categories };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất danh mục!");
  }
};

export const fetchCategory = async (id) => {
  try {
    connectToDb();
    const category = await Category.findById(id);
    return category;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất danh mục!");
  }
};
