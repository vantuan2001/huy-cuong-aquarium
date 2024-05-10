import { User } from "../models";
import { connectToDb } from "../utils";

export const fetchUsers = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;
  try {
    connectToDb();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Không thể truy xuất người dùng!");
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};
