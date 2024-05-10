import Image from "next/image";
import styles from "./newsCard.module.css";
import Link from "next/link";
import moment from "moment";
import StarRating from "../starRating/starRating";

const getReviews = async (postId) => {
  const res = await fetch(
    `https://huy-cuong-aquarium.vercel.app/api/reviews/${postId}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    throw new Error("Đã xảy ra lỗi");
  }
  return res.json();
};

const NewsCard = async ({ post, type }) => {
  const postId = post._id;
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
    <div
      className={`
    ${styles.container} 
    ${type === "small" && styles.containerSmall}`}
    >
      <Link className={styles.link} href={`/news/${post.title}`}>
        <div className={styles.top}>
          {post.img && (
            <div className={styles.imgContainer} key={post._id}>
              <Image
                src={post.img}
                alt=""
                width={300}
                height={170}
                className={styles.img}
              />
            </div>
          )}
        </div>
        <div className={styles.bottom}>
          {type === "small" ? "" : <StarRating rating={averageRating} />}

          <span className={styles.date}>
            {moment(post?.createdAt).format("HH:mm DD/MM/YYYY")}
          </span>
          <h2 className={styles.title}>{post.title}</h2>
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: post?.desc.toString().slice(0, 100),
            }}
          />
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
