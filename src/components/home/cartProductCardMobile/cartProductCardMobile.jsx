"use client";

import { useState } from "react";
import styles from "./cartProductCardMobile.module.css";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeItem, updateCart } from "@/redux/cartReducer";
import Link from "next/link";

const CartProductCardMobile = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <div className={styles.container}>
      <Link href={`/products/${product.title}`}>
        <div className={styles.imgConatiner}>
          <Image
            src={product.img}
            width={70}
            height={70}
            alt=""
            className={styles.img}
          />
          <div className={styles.name}>
            <h3>{product.title}</h3>
            <p>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </p>
          </div>
        </div>
      </Link>

      <div className={styles.button}>
        <div className={styles.quantity}>
          <button
            className={styles.decrement}
            onClick={() =>
              setQuantity((prev) => (prev === 1 ? 1 : prev - 1)) ||
              dispatch(
                updateCart({
                  productId: product.id,
                  quantity: quantity === 1 ? 1 : quantity - 1,
                })
              )
            }
          >
            -
          </button>
          <input
            type={styles.text}
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value) ||
              dispatch(
                updateCart({
                  productId: product.id,
                  quantity: e.target.value,
                })
              )
            }
          />

          <button
            className={styles.increment}
            onClick={() =>
              setQuantity((prev) => prev + 1) ||
              dispatch(
                updateCart({
                  productId: product.id,
                  quantity: quantity + 1,
                })
              )
            }
          >
            +
          </button>
        </div>
        <div className={styles.delete}>
          <button onClick={() => dispatch(removeItem(product.id))}>
            <FaRegTrashAlt className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCardMobile;
