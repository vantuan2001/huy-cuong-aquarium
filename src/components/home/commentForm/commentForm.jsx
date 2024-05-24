"use client";
import { useState } from "react";
import styles from "./commentForm.module.css";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import useSwal from "@/components/toast/useSwal";

const CommentForm = ({ post, session }) => {
  const { Success, Error } = useSwal();
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

        await axios.post("http://localhost:3000/api/reviews", newReview);
        Success({ title: "Đánh giá bài viết thành công!" });
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
        <div className={`w100 ${styles.item}`}>
          <div className="inputItem w50">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
            <label htmlFor="username" className="label">
              Họ Và Tên
            </label>
            {error && email.length < 3 ? (
              <div className="error">Xin vui lòng nhập họ và tên</div>
            ) : (
              ""
            )}
          </div>
          <div className="inputItem w50">
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
            <label htmlFor="email" className="label">
              Email
            </label>
            {error && email.length < 3 ? (
              <div className="error">Xin vui lòng nhập địa chỉ email</div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="inputItem w100">
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className={`textarea ${styles.form}`}
          ></textarea>
          <label htmlFor="comment" className="label">
            Nhận Xét Của Bạn
          </label>
          {error && comment.length < 3 ? (
            <div className="error">Xin vui lòng nhập nhận xét của bạn</div>
          ) : (
            ""
          )}
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
