"use client";

import Image from "next/image";
import styles from "./thanks.module.css";
import Link from "next/link";
import { FcHome, FcShop } from "react-icons/fc";
import { useSearchParams } from "next/navigation";

const Thanks = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  var vnp_TxnRef = params.get("vnp_TxnRef");
  console.log(vnp_TxnRef);
  return (
    <div className="container">
      <div className={styles.container}>
        <Image
          src="/Success.png"
          alt="Success"
          width={100}
          height={100}
          className={styles.img}
        />
        <h2 className={styles.title}>Cảm ơn bạn đã đặt hàng</h2>
        <div className={styles.button}>
          <Link href="/" className={styles.link}>
            <FcHome />
            Quay lại trang chủ
          </Link>
          <Link href="/purchase" className={styles.link}>
            <FcShop />
            Quản lý đơn hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
