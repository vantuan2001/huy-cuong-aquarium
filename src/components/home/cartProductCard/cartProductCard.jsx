"use client";

import { useState } from "react";
import styles from "./cartProductCard.module.css";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeItem, updateCart } from "@/redux/cartReducer";

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <tr>
      <td className={styles.name}>
        <div className={styles.customer}>
          <Image
            src={product.img}
            width={60}
            height={60}
            alt=""
            className={styles.img}
          />
          <span className={styles.title}>{product.title}</span>
        </div>
      </td>
      <td className={styles.price}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)}{" "}
      </td>
      <td className={styles.quantity}>
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
      </td>
      <td className={styles.subtotal}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price * product.quantity)}
      </td>
      <td className={styles.delete}>
        <button onClick={() => dispatch(removeItem(product.id))}>
          <FaRegTrashAlt className={styles.icon} />
        </button>
      </td>
    </tr>
  );
};

export default CartProductCard;
