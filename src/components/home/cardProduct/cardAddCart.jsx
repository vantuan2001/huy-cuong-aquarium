"use client";
import styles from "./productCard.module.css";
import { addToCart } from "@/redux/cartReducer";
import { BsBagPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
const CardAddCart = ({ product }) => {
  const dispatch = useDispatch();

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
    <button className={styles.button} onClick={() => handleAddToCart()}>
      <BsBagPlus />
    </button>
  );
};

export default CardAddCart;
