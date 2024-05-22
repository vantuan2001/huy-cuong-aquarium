"use client";

import { useEffect, useState } from "react";
import styles from "./productButton.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartReducer";
import axios from "axios";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import Swal from "sweetalert2";

const selectProductById = (state, productId) => {
  return state.cart.products.find((product) => product.productId === productId);
};

const ProductButton = ({ product }) => {
  const productId = product._id;
  const selectedProduct = useSelector((state) =>
    selectProductById(state, productId)
  );

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const updateViews = async () => {
      try {
        await axios.put(
          `https://www.huycuongaquarium.online/api/products/views`,
          {
            id: productId,
            views: product.views + +1,
            next: { revalidate: 3600 },
          }
        );
        console.log("Đã cập nhật lượt xem sản phẩm thành công");
      } catch (err) {
        console.error("Lỗi cập nhật lượt xem sản phẩm:", err);
      }
    };

    // Kiểm tra xem id có tồn tại hay không trước khi cập nhật lượt xem
    if (productId) {
      updateViews();
    }
  }, [productId]);

  const handleAddToCart = () => {
    const existingQuantity = selectedProduct ? selectedProduct.quantity : 0;
    dispatch(
      addToCart({
        id: product._id,
        productId: product._id,
        title: product.title,
        img: product.img,
        price: product.price,
        stock: product.stock,
        sold: product.sold,
        quantity: existingQuantity + +quantity,
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
          type="text"
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
