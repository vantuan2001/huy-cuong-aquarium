"use client";

import React from "react";
import Slider from "react-slick";
import styles from "./recentReviews.module.css";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

function RecentReviews({ reviews }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className={styles.salesItem}>
      <div className={styles.itemHeader}>
        <h4>Đánh giá mới nhất.</h4>
        <Link href="/dashboard/reviews" className={styles.link}>
          Xem tất cả
        </Link>
      </div>
      <div className={styles.info}>
        <div className={`slider-container ${styles.slider}`}>
          <Slider {...settings}>
            {reviews.map((item) => (
              <div key={item._id}>
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt="no-avatar"
                    width={50}
                    height={50}
                  />
                  <div className={styles.text}>
                    <h3>{item.username}</h3>
                    <span>
                      {Array.from({ length: item.rating }).map((_, index) => (
                        <span
                          className={styles.star}
                          key={`${item.id}-${index}`}
                        >
                          &#9733;
                        </span>
                      ))}
                      {/* {[...Array(item.rating)].map((i) => {
                        return (
                          <span className={styles.star} key={i}>
                            &#9733;
                          </span>
                        );
                      })} */}
                      ({item.rating})
                    </span>
                  </div>
                </div>
                <span className={styles.comment}>{item.comment}</span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default RecentReviews;
