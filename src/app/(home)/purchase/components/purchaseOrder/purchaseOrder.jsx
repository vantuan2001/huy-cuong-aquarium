import { MdOutlineLocalShipping } from "react-icons/md";
import styles from "./purchaseOrder.module.css";
import ProductItem from "../productItem/productItem";
import Link from "next/link";
import Status from "@/components/home/status/status";
import ButtonPurchase from "@/components/home/buttonPurchase/buttonPurchase";

const PurchaseOrder = ({ order }) => {
  const status = order.status;
  return (
    <>
      <Link href={`/purchase/${order._id}`}>
        <div className={styles.container}>
          <div className={styles.header}>
            {status === 5 ? (
              <>
                <span>
                  <MdOutlineLocalShipping />
                  Giao hàng thành công
                </span>
                <span className={styles.status}>HOÀN THÀNH</span>
              </>
            ) : (
              <p className={styles.status}>
                <Status status={status} />
              </p>
            )}
          </div>
          {order.products.map((item) => (
            <ProductItem item={item} key={item._id} />
          ))}
        </div>
      </Link>
      <div className={styles.bottom}>
        <div className={styles.price}>
          <span>Tổng tiền:</span>
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(order.total)}
          </span>
        </div>
        {status <= 0 ? (
          <div className={styles.buttons}>
            <p className={styles.cancel}>Đã hủy đơn hàng</p>
          </div>
        ) : (
          <div className={styles.buttons}>
            <p>
              {status === 5
                ? "Cảm ơn bạn đã mua sắm tại Huy cường Aquarium!"
                : "Hãy kiểm tra cẩn thận tất cả các sản phẩm trong đơn hàng trước khi bấm 'Đã nhận được hàng'"}
            </p>
            <ButtonPurchase order={order} purchase={true} />
          </div>
        )}
      </div>
    </>
  );
};

export default PurchaseOrder;
