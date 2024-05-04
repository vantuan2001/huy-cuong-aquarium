"use client";

import Link from "next/link";
import styles from "./filter.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import FilterBrand from "../filterBrand/FilterBrand";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useState } from "react";
import NewsCard from "../cardNews/newsCard";

const Filter = ({ news, categories, brands }) => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={
          open ? `${styles.buttons} ${styles.buttonsOpen}` : `${styles.buttons}`
        }
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <FaTimes /> : <FaFilter className={styles.icon} />}
      </div>
      <div
        className={
          open ? `${styles.opacity} ${styles.opacityOpen}` : `${styles.opacity}`
        }
      ></div>
      <div
        className={
          open ? `${styles.wrapper} ${styles.wrapperOpen}` : `${styles.wrapper}`
        }
      >
        {!news ? (
          ""
        ) : (
          <div className={styles.filterItem}>
            <h3>Kiến thức và tư vấn</h3>
            <div className={styles.list}>
              {news?.map((post) => (
                <NewsCard post={post} key={post._id} type="small" />
              ))}
            </div>
          </div>
        )}

        <div className={styles.filterItem}>
          <h3>Danh mục sản phẩm</h3>
          <div className={styles.box}>
            <div className={styles.inputItem}>
              <Link className={styles.link} href="/products">
                {/* <span className={`${styles.title}   ${styles.active}`}> */}
                <span
                  className={`${styles.title}  ${
                    pathName === "/products" && styles.active
                  }`}
                >
                  Tất cả
                </span>
              </Link>
            </div>

            {categories.map((item) => (
              <div className={styles.inputItem} key={item._id}>
                <Link className={styles.link} href={`/products?c=${item.name}`}>
                  {item.img_logo && (
                    <Image src={item.img_logo} alt="" width={30} height={30} />
                  )}

                  <span className={styles.title}>{item.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {!brands ? "" : <FilterBrand brands={brands} />}
      </div>
    </div>
  );
};

export default Filter;
