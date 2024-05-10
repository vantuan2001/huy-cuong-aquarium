import { Review } from "../models";
import { connectToDb } from "../utils";

export const fetchReviews = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const count = await Review.find({ comment: { $regex: regex } }).count();
    const reviews = await Review.find({ comment: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, reviews };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đánh giá!");
  }
};

export const fetchReview = async (postId) => {
  try {
    connectToDb();
    const review = await Review.findOne(postId);
    return review;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đánh giá!");
  }
};

export const fetchRating = async (postId) => {
  try {
    connectToDb();
    const review = await Review.find(postId);
    return review;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đánh giá!");
  }
};
