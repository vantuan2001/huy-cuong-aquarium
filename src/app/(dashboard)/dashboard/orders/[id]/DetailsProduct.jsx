import { fetchProduct } from "@/lib/data";
import styles from "./singleOrder.module.css";
import Image from "next/image";

const DetailsProduct = async ({ item }) => {
  const product = await fetchProduct(item.productId);

  return (
    <tr>
      <td>
        <div className={styles.product}>
          <Image
            src={product.img}
            alt=""
            width={70}
            height={70}
            className={styles.productImage}
          />
          {product.title}
        </div>
      </td>
      <td style={{ textAlign: "center" }}>x{item.quantity}</td>
      <td style={{ textAlign: "right" }}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(product.price)}
      </td>
    </tr>
  );
};

export default DetailsProduct;
