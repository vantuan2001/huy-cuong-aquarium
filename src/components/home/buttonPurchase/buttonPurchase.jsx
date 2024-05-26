"use client";
import styles from "./buttonPurchase.module.css";
import {
  cancelOrder,
  cancelPurchase,
  updateStatusOrder,
} from "@/lib/orders/action";
import useSwal from "@/components/toast/useSwal";
import axios from "axios";

const ButtonPurchase = ({ order, purchase }) => {
  const next = order.status < 1 || order.status >= 5;
  const cancel = order.status === 1;
  const confirm = order.status === 4;
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

  const handleCancelPurchase = async (e) => {
    e.preventDefault();

    try {
      await ToastDelete({
        name: "huỷ đơn hàng",
        cancel,
        method: cancelPurchase,
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
    <>
      {!purchase ? (
        <div className={styles.buttons}>
          <form onSubmit={handleCancel}>
            <button
              className={`${styles.button} ${styles.btnCancel}`}
              disabled={!cancel}
            >
              Huỷ Đơn Hàng
            </button>
          </form>

          <form onSubmit={handleSubmit}>
            <button className={styles.button} disabled={next}>
              Bước tiếp theo
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.btnGroup}>
          <form onSubmit={handleCancelPurchase}>
            <button
              className={`${styles.button} ${styles.btnCancel}`}
              disabled={!cancel}
            >
              Huỷ Đơn Hàng
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <button
              className={
                !purchase
                  ? styles.button
                  : `${styles.purchase} ${styles.button}`
              }
              disabled={!confirm}
            >
              Đã Nhận Hàng
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ButtonPurchase;
