import { News } from "../models";
import { connectToDb } from "../utils";

export const fetchNews = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const count = await News.find({ title: { $regex: regex } }).count();
    const news = await News.find({ title: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, news };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất tức!");
  }
};

export const fetchLimitNews = async (number) => {
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const news = await News.find().limit(ITEM_PER_PAGE);
    return news;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất tin tức!");
  }
};

export const getNews = async (id) => {
  try {
    connectToDb();
    const news = await News.findById(id);
    return news;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất tin tức!");
  }
};
