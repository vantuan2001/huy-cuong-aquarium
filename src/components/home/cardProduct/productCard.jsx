import Image from "next/image";
import styles from "./productCard.module.css";
import Link from "next/link";
import CardAddCart from "./cardAddCart";
import StarRating from "../starRating/starRating";

const getReviews = async (postId) => {
  const res = await fetch(`http://localhost:3000/api/reviews/${postId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }
  return res.json();
};

const ProductCard = async ({ product }) => {
  const postId = product._id;
  const reviews = await getReviews(postId);
  const data = reviews ? reviews.map((item) => item.rating) : [];

  // Hàm tính điểm trung bình từ mảng đánh giá
  const calculateAverageRating = (ratings) => {
    // Kiểm tra xem có mảng đánh giá không
    if (ratings.length === 0) {
      return 0; // Trả về 0 nếu không có mảng đánh giá
    }
    // Tính tổng đánh giá
    const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
    // Tính xếp hạng trung bình
    const averageRating = totalRating / ratings.length;
    return averageRating;
  };

  const averageRating = calculateAverageRating(data);
  return (
    <div className={styles.container} key={product._id}>
      <Link className={styles.link} href={`/products/${product.title}`}>
        <div className={styles.top}>
          <div className={styles.imgContainer}>
            {product.stock <= 0 && (
              <span className={styles.outStock}>Hết hàng</span>
            )}
            <Image
              src={product.img}
              alt=""
              width={200}
              height={200}
              className={styles.img}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.category}>{product.category}</span>
          <h2 className={styles.title}>{product.title}</h2>
          <StarRating rating={averageRating} />

          <h3 className={styles.price}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </h3>
        </div>
      </Link>
      <div className={styles.widget}>
        <CardAddCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
