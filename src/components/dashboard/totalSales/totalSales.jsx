// "use client";

import { BsCreditCard2Front } from "react-icons/bs";
import styles from "./totalSales.module.css";
import Image from "next/image";
import Link from "next/link";

const TotalSales = ({ orders }) => {
  const totalPrice = () => {
    let total = 0;
    orders.forEach((item) => {
      total += item.total;
    });

    return total;
  };
  return (
    <div className={styles.salesItem}>
      <div className={styles.itemHeader}>
        <BsCreditCard2Front className={styles.icon} />
        <Link href="/dashboard/orders" className={styles.link}>
          Xem tất cả
        </Link>
      </div>
      <h4>Doanh thu</h4>
      <div className={styles.info}>
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalPrice())}
        </span>
        <Image src="/line-2.png" alt="" width={110} height={57} />
      </div>
    </div>
  );
};

export default TotalSales;
