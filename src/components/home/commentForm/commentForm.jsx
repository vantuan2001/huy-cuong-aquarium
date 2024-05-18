"use client";
import { useState } from "react";
import styles from "./commentForm.module.css";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import useSwal from "@/components/toast/useSwal";

const CommentForm = ({ post, session }) => {
  const { Error } = useSwal();
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(1);
  const [username, setUsername] = useState(session?.user.username);
  const [email, setEmail] = useState(session?.user.email);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const handleCreate = async () => {
    if (hover === 0 || !hover || !email || !comment) {
      setError(true);
      Error({ title: "Đã có lỗi trong quá trình đánh giá" });
    } else {
      try {
        const newReview = {
          rating: hover,
          username,
          email,
          comment,
          postId: post._id,
          userId: session.user._id,
        };

        await axios.post(
          "https://huycuongaquarium.online/api/reviews",
          newReview
        );
        console.log("saved to db");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3>Đánh giá của bạn</h3>
      <div className={styles.star}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? styles.on : styles.off}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span style={{ fontSize: "22px" }}>&#9733;</span>
            </button>
          );
        })}
      </div>

      <div className={styles.form}>
        <div className={styles.item}>
          <input
            type="text"
            placeholder="Họ Và Tên"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <textarea
            name="comment"
            id=""
            cols="30"
            rows="10"
            placeholder="Nhận Xét Của Bạn"
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        {session?.user ? (
          <button className={styles.button} onClick={handleCreate}>
            Gửi đánh giá
            <FaArrowRight />
          </button>
        ) : (
          <Link href="/login" className={styles.button}>
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default CommentForm;
