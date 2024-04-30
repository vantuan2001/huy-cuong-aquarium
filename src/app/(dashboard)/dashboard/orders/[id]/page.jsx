import { fetchOrder } from "@/lib/data";
import styles from "./singleOrder.module.css";

import DetailsProduct from "./DetailsProduct";
import moment from "moment";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import Status from "@/components/status/status";
import { cancelOrder, updateStatusOrder } from "@/lib/action";

const SingleOrderPage = async ({ params }) => {
  const { id } = params;
  const order = await fetchOrder(id);
  const status = order.status;
  const next = status >= 5;
  const cancel = status === 5;
  const totalPrice = () => {
    let total = 0;
    order.products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/orders" className={styles.link}>
          <BsChevronLeft />
          Trở lại
        </Link>
        {status <= 0 ? (
          <div className={styles.text}>
            <span>MÃ ĐƠN HÀNG: {order._id}</span>
          </div>
        ) : (
          <div className={styles.text}>
            <span>MÃ ĐƠN HÀNG: {order._id}</span>
            <span className={styles.status}>
              <Status status={status} />
            </span>
          </div>
        )}
      </div>
      {status <= 0 ? (
        <div className={styles.buttons}>
          <p className={styles.cancel}>Đã hủy đơn hàng</p>
        </div>
      ) : (
        <div className={styles.buttons}>
          <form action={cancelOrder}>
            <input type="hidden" name="id" value={order._id} />
            <button
              className={`${styles.button} ${styles.btnCancel}`}
              disabled={cancel}
            >
              Huỷ Đơn Hàng
            </button>
          </form>

          <form action={updateStatusOrder}>
            <input type="hidden" name="id" value={order._id} />
            <input type="hidden" name="status" value={order.status} />
            <button className={styles.button} disabled={next}>
              Bước tiếp theo
            </button>
          </form>
        </div>
      )}
      <div className={styles.user}>
        <h2>Địa chỉ giao hàng</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Họ và tên</td>
              <td>Số điện thoại</td>
              <td>Địa chỉ</td>
              <td>Thời gian</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.username}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{moment(order.createdAt).format("HH:mm DD/MM/YYYY")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.products}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Tên sản phẩm</td>
              <td style={{ textAlign: "center" }}>Số lượng</td>
              <td style={{ textAlign: "right" }}>Giá tiền</td>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item) => (
              <DetailsProduct item={item} key={item._id} />
            ))}
          </tbody>
        </table>
        <div className={styles.price}>
          <div className={styles.priceList}>
            <div className={styles.priceItem}>
              <span>Tổng tiền hàng</span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice())}
              </span>
            </div>

            <div className={styles.priceItem}>
              <span>Phí vận chuyển</span>
              <span>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(30000)}
              </span>
            </div>
            <div className={styles.priceItem}>
              <span>Thành tiền</span>
              <span style={{ color: "red", fontWeight: "500" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice() + 30000)}
              </span>
            </div>
            <div className={styles.priceItem}>
              <span>Phương thức Thanh toán</span>
              <span>
                {order.paymentMethods != "0"
                  ? "Thanh toán VNPAY"
                  : "Thanh toán khi nhận hàng"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
