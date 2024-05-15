import styles from "./comment.module.css";
import CommentForm from "../commentForm/commentForm";
import moment from "moment";
import { auth } from "@/lib/auth";

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

const Comment = async ({ post }) => {
  const postId = post._id;
  const session = await auth();
  const reviews = await getReviews(postId);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Đánh giá: <span>({reviews.length})</span>
      </div>
      <div className={styles.content}>
        <div className={styles.list}>
          {reviews.map((review) => (
            <div className={styles.item} key={review._id}>
              <div className={styles.images}>
                <div className={styles.avatar}>
                  <div className={styles.avatarText}>
                    {review.username.toString().slice(0, 1)}
                  </div>
                </div>
              </div>
              <div className={styles.text}>
                <div className={styles.star}>
                  {[...Array(review.rating)].map((star) => {
                    return (
                      <span className={styles.star} key={star}>
                        &#9733;
                      </span>
                    );
                  })}
                </div>
                <div className={styles.meta}>
                  <h3 className={styles.name}>{review.username}</h3>
                  <span className={styles.date}>
                    {moment(review.createdAt).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className={styles.desc}>{review.comment}</div>
              </div>
            </div>
          ))}
        </div>
        <CommentForm post={post} session={session} />
      </div>
    </div>
  );
};

export default Comment;
