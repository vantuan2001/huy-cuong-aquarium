import styles from "./singleOrder.module.css";
import DetailsProduct from "./DetailsProduct";
import moment from "moment";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import Status from "@/components/home/status/status";
import { fetchOrder } from "@/lib/orders/data";
import ButtonPurchase from "@/components/home/buttonPurchase/buttonPurchase";

const SingleOrderPage = async ({ params }) => {
  const { id } = params;
  const order = await fetchOrder(id);
  const orderObject = JSON.parse(JSON.stringify(order));
  const status = orderObject.status;

  const totalPrice = orderObject.products.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/orders" className={styles.link}>
          <BsChevronLeft />
          Trở lại
        </Link>
        {status <= 0 ? (
          <div className={styles.text}>
            <span>MÃ ĐƠN HÀNG: {orderObject._id}</span>
          </div>
        ) : (
          <div className={styles.text}>
            <span>MÃ ĐƠN HÀNG: {orderObject._id}</span>
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
        <ButtonPurchase order={orderObject} />
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
            {orderObject.products.map((item) => (
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
                }).format(totalPrice)}
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
                }).format(totalPrice + 30000)}
              </span>
            </div>
            <div className={styles.priceItem}>
              <span>Phương thức Thanh toán</span>
              <span>
                {orderObject.paymentMethods != "0"
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
