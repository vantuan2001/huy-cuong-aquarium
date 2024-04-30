import Link from "next/link";
import styles from "./singlePurchasePage.module.css";
import { BsChevronLeft } from "react-icons/bs";
import ProductItem from "../../purchase/components/productItem/productItem";
import StatusOrder from "../../purchase/components/statusOrder/statusOrder";
import { fetchOrder } from "@/lib/data";
import Status from "@/components/status/status";
import { cancelOrder, updateStatusOrder } from "@/lib/action";

const SinglePurchasePage = async ({ params }) => {
  const { id } = params;
  const order = await fetchOrder(id);
  const status = 1;
  // const status = order.status;
  const hasPrev = status === 4;
  const cancel = status === 5;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/purchase" className={styles.link}>
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
      <StatusOrder order={order} />
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
          <div className={styles.btnGroup}>
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
              <button className={styles.button} disabled={!hasPrev}>
                Đã Nhận Hàng
              </button>
            </form>
          </div>
        </div>
      )}
      <div className={styles.center}>
        <div className={styles.user}>
          <h2>Địa chỉ nhận hàng</h2>
          <ul>
            <li>Tạ Văn Tuấn</li>
            <li>(+84) 966245700</li>
            <li>
              Cạnh Gym Titan, Ngõ 114 Đường Z115, Phường Tân Thịnh, Thành Phố
              Thái Nguyên, Thái Nguyên
            </li>
          </ul>
        </div>
        {order.products.map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}
      </div>

      <div className={styles.price}>
        <div className={styles.priceList}>
          <div className={styles.priceItem}>
            <span>Tổng tiền hàng</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order.total)}
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
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order.total + 30000)}
            </span>
          </div>
          <div className={styles.priceItem}>
            <span>Phương thức Thanh toán</span>
            <span>
              {order.paymentMethods != 0
                ? "Thanh toán VNPAY"
                : "Thanh toán khi nhận hàng"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePurchasePage;
