"use client";
import { useState } from "react";

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
    <div>
      <button
        onClick={toggleDescription}
        className={`accordion-button ${isDescriptionOpen ? "active" : ""}`}
      >
        Mô tả sản phẩm
      </button>
      <button
        onClick={toggleReviews}
        className={`accordion-button ${isReviewsOpen ? "active" : ""}`}
      >
        Đánh giá từ khách hàng
      </button>
      {isDescriptionOpen && (
        <div className="accordion-content">{description}</div>
      )}

      {isReviewsOpen && <div className="accordion-content">{reviews}</div>}
      <style jsx>{`
        .accordion-button {
          background-color: #f1f1f1;
          border: none;
          outline: none;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          text-align: left;
          font-size: 15px;
          transition: 0.4s;
        }

        .accordion-button.active {
          background-color: #ccc; /* Change to your active color */
        }

        .accordion-content {
          padding: 0 18px;
          background-color: white;
          overflow: hidden;
          transition: max-height 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Accordion;
