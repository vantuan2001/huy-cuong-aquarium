"use client";

import Link from "next/link";
import styles from "./productLefttBar.module.css";
import { usePathname } from "next/navigation";
import Image from "next/image";
import FilterBrand from "../filterBrand/FilterBrand";

const ProductLefttBar = ({ categories, brands }) => {
  const pathName = usePathname();
  return (
    <div className={styles.left}>
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

      <FilterBrand brands={brands} />
    </div>
  );
};

export default ProductLefttBar;
