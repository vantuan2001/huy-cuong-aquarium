"use client";
import useSwal from "@/components/toast/useSwal";
import styles from "./productCard.module.css";
import { addToCart } from "@/redux/cartReducer";
import { BsBagPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
const selectProductById = (state, productId) => {
  return state.cart.products.find((product) => product.productId === productId);
};

const CardAddCart = ({ product }) => {
  const productId = product._id;
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) =>
    selectProductById(state, productId)
  );

  const { AddToCart } = useSwal();
  const existingQuantity = selectedProduct ? selectedProduct.quantity : 0;
  const stock = existingQuantity >= product.stock || product.stock <= 0;
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
        quantity: existingQuantity + +1,
      })
    );
    AddToCart({ title: `${product.title} thêm vào giỏ hàng thành công!` });
  };
  return (
    <button
      className={styles.button}
      onClick={() => handleAddToCart()}
      disabled={stock}
    >
      <BsBagPlus />
    </button>
  );
};

export default CardAddCart;
