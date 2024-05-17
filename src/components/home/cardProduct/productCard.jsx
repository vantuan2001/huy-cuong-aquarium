import Image from "next/image";
import styles from "./productCard.module.css";
import Link from "next/link";
import CardAddCart from "./cardAddCart";
import StarRating from "../starRating/starRating";

const ProductCard = async ({ product }) => {
  return (
    <div className={styles.container} key={product._id}>
      <Link className={styles.link} href={`/products/${product.title}`}>
        <div className={styles.top}>
          <div className={styles.imgContainer}>
            {product.stock <= 0 && (
              <span className={styles.outStock}>Hết hàng</span>
            )}
            <Image
              src={product.img}
              alt=""
              width={200}
              height={200}
              className={styles.img}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.category}>{product.category}</span>
          <h2 className={styles.title}>{product.title}</h2>
          <StarRating postId={product._id} />

          <h3 className={styles.price}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </h3>
        </div>
      </Link>
      <div className={styles.widget}>
        <CardAddCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
