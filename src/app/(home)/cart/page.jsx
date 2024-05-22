"use client";

import styles from "./cart.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import CartProductCard from "@/components/home/cartProductCard/cartProductCard";
import { useEffect, useState } from "react";
import CartProductCardMobile from "@/components/home/cartProductCardMobile/cartProductCardMobile";
import { AiOutlineDoubleRight } from "react-icons/ai";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const totalPrice = products.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link href="/" className="breadcrumbs-link">
          Trang chủ
        </Link>
        <AiOutlineDoubleRight />
        <p className="breadcrumbs-link">Giỏ hàng</p>
      </div>
      {isClient ? (
        products.length === 0 ? (
          <div className={styles.cartNoProduct}>
            <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
            <Link href="/products" className={styles.btnCheckout}>
              Quay trở lại cửa hàng
            </Link>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.top}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tạm tính</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <CartProductCard product={product} key={product.title} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.cartMobile}>
              {products.map((product) => (
                <CartProductCardMobile product={product} key={product.title} />
              ))}
            </div>
            <div className={styles.bottom}>
              <h3>Cộng giỏ hàng</h3>
              <div>
                <h4>Tạm tính</h4>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </span>
              </div>
              <div>
                <h4>Tổng</h4>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice)}
                </span>
              </div>
              <Link href="/checkout" className={styles.btnCheckout}>
                Tiến Hành Thanh Toán
              </Link>
            </div>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
