import Image from "next/image";
import styles from "./productItem.module.css";
import { fetchProduct } from "@/lib/data";

const ProductItem = async ({ item }) => {
  const product = await fetchProduct(item.productId);
  // const productObject = JSON.parse(JSON.stringify(product));
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Image
          src={product.img}
          alt=""
          width={60}
          height={60}
          className={styles.img}
        />
        <div className={styles.name}>
          <h3>{product.title}</h3>
          <span>x{item.quantity}</span>
        </div>
      </div>
      <div className={styles.price}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)}
      </div>
    </div>
  );
};

export default ProductItem;
