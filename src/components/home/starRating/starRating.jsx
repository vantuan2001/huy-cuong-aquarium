import { fetchRating } from "@/lib/reviews/data";
import React from "react";

const StarRating = async ({ postId }) => {
  const reviews = await fetchRating(postId);
  const ratings = reviews.map((item) => item.rating);

  // Hàm tính điểm trung bình từ một mảng đánh giá
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 0; // Trả về 0 nếu không có đánh giá nào
    }
    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    return totalRating / ratings.length;
  };

  const averageRating = calculateAverageRating(ratings);

  // Tính số sao đầy và số sao rỗng dựa trên điểm trung bình
  const filledStars = Math.round(averageRating);
  const emptyStars = 5 - filledStars;

  // Hiển thị số sao đầy và rỗng
  return (
    <div className="star-rating">
      {[...Array(filledStars)].map((_, index) => (
        <span key={index}>&#9733;</span> // Số sao đầy
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index}>&#9734;</span> // Số sao rỗng
      ))}
    </div>
  );
};

export default StarRating;
