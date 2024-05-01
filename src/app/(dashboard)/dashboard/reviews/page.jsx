import styles from "./reviews.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { fetchReviews } from "@/lib/data";
import { deleteReview } from "@/lib/action";

const ReviewsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const number = 10;
  const { count, reviews } = await fetchReviews(q, page, number);
  const reviewsObject = JSON.parse(JSON.stringify(reviews));
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Tìm kiếm bình luận..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Tên khách hàng</td>
            <td>Email</td>
            <td>Bình luận</td>
            <td>Đánh giá</td>
          </tr>
        </thead>
        <tbody>
          {reviewsObject.map((review) => (
            <tr key={review._id}>
              <td>{review.username}</td>
              <td>{review.email}</td>
              <td>{review.comment}</td>
              <td>
                <div className={styles.star}>
                  {[...Array(review.rating)].map((star) => {
                    return (
                      <span className={styles.star} key={star}>
                        &#9733;
                      </span>
                    );
                  })}
                </div>
              </td>
              <td>
                <div className={styles.buttons}>
                  <form action={deleteReview}>
                    <input type="hidden" name="id" value={review._id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Xoá
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ReviewsPage;
