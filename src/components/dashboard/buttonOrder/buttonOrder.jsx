"use client";

import Link from "next/link";
import styles from "./buttonOrder.module.css";
import { cancelOrder, updateStatusOrder } from "@/lib/orders/action";
import { BsCheckCircle, BsPencilSquare, BsXCircle } from "react-icons/bs";
import useSwal from "@/components/toast/useSwal";
import axios from "axios";
const ButtonOrder = ({ order }) => {
  const next = order.status < 1 || order.status >= 5;
  const cancel = order.status === 1;
  const { ToastSuccess, Error, ToastDelete } = useSwal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", order._id);
      formData.append("status", order.status);
      await updateStatusOrder(formData);
      ToastSuccess({ title: "Cập nhật đơn hàng" });
    } catch (err) {
      console.error("Lỗi khi gửi biểu mẫu:", err);
      Error({ title: "Lỗi cập nhật đơn hàng" });
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      await ToastDelete({
        name: "huỷ đơn hàng",
        cancel,
        method: cancelOrder,
        id: order._id,
      });
      order.products.map((item) => {
        const updateProduct = async () => {
          try {
            await axios.put(
              `https://www.huycuongaquarium.online/api/products/updatequantity`,
              {
                id: item.productId,
                stock: item.quantity,
                sold: item.quantity,
              }
            );
            console.log("Số lượng sản phẩm được cập nhật thành công");
          } catch (err) {
            console.error("Lỗi cập nhật số lượng sản phẩm:", err);
          }
        };

        return updateProduct();
      });
    } catch (err) {
      console.error("Lỗi khi gửi biểu mẫu:", err);
    }
  };

  return (
    <div className={styles.buttons}>
      <Link href={`/dashboard/orders/${order._id}`}>
        <button className={`${styles.button} ${styles.view}`}>
          <BsPencilSquare />
        </button>
      </Link>

      <form onSubmit={handleSubmit}>
        <button className={`${styles.button} ${styles.next}`} disabled={next}>
          <BsCheckCircle />
        </button>
      </form>

      <form onSubmit={handleCancel}>
        <button
          className={`${styles.button} ${styles.delete}`}
          disabled={!cancel}
        >
          <BsXCircle />
        </button>
      </form>
    </div>
  );
};

export default ButtonOrder;
