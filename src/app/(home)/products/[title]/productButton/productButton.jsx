"use client";

import { useEffect, useState } from "react";
import styles from "./productButton.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import axios from "axios";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import Swal from "sweetalert2";

const ProductButton = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const id = product._id;

  useEffect(() => {
    const updateViews = async () => {
      try {
        await axios.put(`https://huycuongaquarium.online/api/products/views`, {
          id: id,
          views: product.views + +1,
          next: { revalidate: 3600 },
        });
        console.log("Đã cập nhật lượt xem sản phẩm thành công");
      } catch (err) {
        console.error("Lỗi cập nhật lượt xem sản phẩm:", err);
      }
    };

    // Kiểm tra xem id có tồn tại hay không trước khi cập nhật lượt xem
    if (id) {
      updateViews();
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        productId: product._id,
        title: product.title,
        img: product.img,
        price: product.price,
        stock: product.stock,
        sold: product.sold,
        quantity: 1,
      })
    );
    Swal.fire({
      position: "top-end",
      // icon: "success",
      title: `${product.title} thêm vào giỏ hàng thành công!`,
      showConfirmButton: false,
      timer: 1500,
      height: 40,
    });
  };
  return (
    <>
      <div className={styles.quantity}>
        <button
          onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
        >
          <BsDashLg />
        </button>
        <input
          type={styles.text}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={() => setQuantity((prev) => prev + 1)}>
          <BsPlusLg />
        </button>
      </div>
      <div className={styles.links}>
        <button className={styles.button} onClick={() => handleAddToCart()}>
          <AiOutlineShoppingCart />
          Thêm vào giỏ hàng
        </button>
      </div>
    </>
  );
};

export default ProductButton;
