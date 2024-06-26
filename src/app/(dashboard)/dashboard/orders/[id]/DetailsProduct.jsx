import { fetchProduct } from "@/lib/products/data";
import styles from "./singleOrder.module.css";
import Image from "next/image";
import Link from "next/link";

const DetailsProduct = async ({ item }) => {
  const product = await fetchProduct(item.productId);
  const productObject = JSON.parse(JSON.stringify(product));
  return (
    <tr>
      <td>
        <Link href={`/dashboard/products/${productObject._id}`}>
          <div className={styles.product}>
            <Image
              src={productObject.img}
              alt=""
              width={70}
              height={70}
              className={styles.productImage}
            />
            {productObject.title}
          </div>
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>x{item.quantity}</td>
      <td style={{ textAlign: "right" }}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(productObject.price)}
      </td>
    </tr>
  );
};

export default DetailsProduct;
