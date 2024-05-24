"use client";
import { useState } from "react";
import styles from "./accordion.module.css";

const Accordion = ({ description, reviews }) => {
  const [isDescriptionOpen, setDescriptionOpen] = useState(true);
  const [isReviewsOpen, setReviewsOpen] = useState(false);

  const toggleDescription = () => {
    setDescriptionOpen(true);
    setReviewsOpen(false);
  };

  const toggleReviews = () => {
    setDescriptionOpen(false);
    setReviewsOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button
          onClick={toggleDescription}
          className={`${styles.button} ${
            isDescriptionOpen ? styles.active : ""
          }`}
        >
          Mô tả sản phẩm
        </button>
        <button
          onClick={toggleReviews}
          className={`${styles.button} ${isReviewsOpen ? styles.active : ""}`}
        >
          Đánh giá từ khách hàng
        </button>
      </div>
      <div className={styles.info}>
        {isDescriptionOpen && (
          <div className={styles.content}>{description}</div>
        )}
        {isReviewsOpen && <div className={styles.content}>{reviews}</div>}
      </div>
    </div>
  );
};

export default Accordion;
