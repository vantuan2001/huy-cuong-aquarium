import styles from "./checkoutProductCard.module.css";
import Image from "next/image";

const CheckoutProductCard = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={product.img}
          width={60}
          height={60}
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>
          <h3>{product.title}</h3>
        </div>
        <div className={styles.content}>
          <div className={styles.quantity}>
            <span>{product.quantity}</span>
            <p>x</p>
          </div>
          <div className={styles.price}>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
