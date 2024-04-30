import Link from "next/link";
import styles from "./featuredProducts.module.css";
import { BsChevronRight } from "react-icons/bs";
import ProductCard from "../cardProduct/productCard";

const FeaturedProducts = async ({ title, products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.titleWrapper}>
          <h3>{title}</h3>
        </div>
        <Link className={styles.link} href="/products">
          <div className={styles.more}>
            Xem Thêm <BsChevronRight />
          </div>
        </Link>
      </div>
      <div className={styles.center}>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
