import Image from "next/image";

import styles from "./sellingProducts.module.css";

const SellingProducts = async ({ products, type }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Tên sản phẩm</td>
            <td style={{ width: "110px", textAlign: "center" }}>Giá tiền</td>
            <td
              className={type === "views" ? styles.show : styles.hide}
              style={{ textAlign: "center" }}
            >
              Lượt xem
            </td>
            <td
              className={type === "sale" ? styles.show : styles.hide}
              style={{ textAlign: "center" }}
            >
              Đã bán
            </td>

            <td style={{ textAlign: "center" }}>Tồn kho</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={product.img}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td style={{ width: "110px", textAlign: "center" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </td>
              <td
                className={type === "views" ? styles.show : styles.hide}
                style={{ textAlign: "center" }}
              >
                {product.views}
              </td>
              <td
                className={type === "sale" ? styles.show : styles.hide}
                style={{ textAlign: "center" }}
              >
                {product.sold}
              </td>
              <td style={{ textAlign: "center" }}>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellingProducts;
