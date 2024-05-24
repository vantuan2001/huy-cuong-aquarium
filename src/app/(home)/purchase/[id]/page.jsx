import Link from "next/link";
import styles from "./singlePurchasePage.module.css";
import { BsChevronLeft } from "react-icons/bs";
import ProductItem from "../../purchase/components/productItem/productItem";
import StatusOrder from "../../purchase/components/statusOrder/statusOrder";
import Status from "@/components/home/status/status";
import { fetchOrder } from "@/lib/orders/data";
import ButtonPurchase from "@/components/home/buttonPurchase/buttonPurchase";

const SinglePurchasePage = async ({ params }) => {
  const { id } = params;
  const order = await fetchOrder(id);
  const orderObject = JSON.parse(JSON.stringify(order));
  const status = orderObject.status;

  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.top}>
          <Link href="/purchase" className={styles.link}>
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
        <StatusOrder order={orderObject} />
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
            <ButtonPurchase order={orderObject} purchase={true} />
          </div>
        )}
        <div className={styles.center}>
          <div className={styles.user}>
            <h2>Địa chỉ nhận hàng</h2>
            <ul>
              <li>{orderObject.username}</li>
              <li>{orderObject.phone}</li>
              <li>{orderObject.address}</li>
              <li>{orderObject.note}</li>
            </ul>
          </div>
          {orderObject.products.map((item) => (
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
    </div>
  );
};

export default SinglePurchasePage;
