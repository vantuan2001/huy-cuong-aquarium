const StarRating = ({ rating }) => {
  // Số sao đầy
  const filledStars = Math.round(rating);
  // Số sao rỗng
  const emptyStars = 5 - filledStars;
  // Hiển thị số sao
  return (
    <div className="star-rating">
      {/* Số sao đầy */}
      {[...Array(filledStars)].map((_, index) => (
        <span key={index}>&#9733;</span>
      ))}
      {/* Số sao rỗng */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index}>&#9734;</span>
      ))}
    </div>
  );
};

export default StarRating;
