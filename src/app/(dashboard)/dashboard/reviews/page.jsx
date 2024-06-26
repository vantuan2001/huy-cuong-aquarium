import styles from "./reviews.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import { fetchReviews } from "@/lib/reviews/data";
import { deleteReview } from "@/lib/reviews/action";
import DeleteForm from "@/components/dashboard/deleteForm/deleteForm";

const ReviewsPage = async ({ searchParams }) => {
  const { q = "", page = 1 } = searchParams || {};
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
            <td>Baai viet</td>
            <td>Đánh giá</td>
          </tr>
        </thead>
        <tbody>
          {reviewsObject.map((review) => (
            <tr key={review._id}>
              <td>{review.username}</td>
              <td>{review.email}</td>
              <td>{review.postId}</td>
              <td>{review.comment}</td>
              <td>
                <div className={styles.star}>
                  {[...Array(review.rating)].map((_, index) => (
                    <span key={index}>&#9733;</span>
                  ))}
                </div>
              </td>
              <td>
                <div className={styles.buttons}>
                  <DeleteForm
                    name="đánh giá"
                    deleteMethod={deleteReview}
                    type={review}
                  />
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
