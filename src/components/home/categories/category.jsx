"use client";

import Image from "next/image";
import styles from "./category.module.css";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const Category = ({ categories }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.category}>
      <div className="slider-container">
        {isClient ? (
          <Slider {...settings}>
            {categories.map((item) => (
              <div key={item._id}>
                <Link className={styles.item} href={`/products?c=${item.name}`}>
                  <Image
                    src={item.img_logo}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.img}
                  />
                  <span className={styles.title}>{item.name}</span>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Category;
