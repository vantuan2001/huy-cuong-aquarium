import { FaRegStar, FaShippingFast } from "react-icons/fa";
import styles from "./statusOrder.module.css";
import { BsCash, BsClipboard2Check, BsInboxFill } from "react-icons/bs";
const StatusOrder = ({ order }) => {
  const status = order.status;
  console.log(status);
  const paymentMethods = order.paymentMethods;
  const price = order.total;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  const statusLine = (status) => {
    if (status === 0) return styles.canceled;
    if (status === 1) return styles.canceled;
    if (status === 2) return styles.confirm;
    if (status === 3) return styles.delivery;
    if (status === 4) return styles.transport;
    if (status >= 5) return styles.success;
  };
  return (
    <>
      {status <= 0 ? (
        ""
      ) : (
        <div className={styles.status}>
          <div className={`${styles.item} ${statusClass(1)}`}>
            <BsClipboard2Check className={styles.icon} />
            {status > 1 ? <p>Đơn hàng đã đặt</p> : <p>Chờ xác nhận</p>}
          </div>
          <div className={`${styles.item} ${statusClass(2)}`}>
            <BsCash className={styles.icon} />
            {status > 1 ? (
              paymentMethods === 1 ? (
                <p>
                  Đơn hàng đã thanh toán (
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(price)}
                  )
                </p>
              ) : (
                <p>Đã xác nhận thông tin thanh toán</p>
              )
            ) : (
              <p>Chờ xác nhận</p>
            )}
          </div>
          <div className={`${styles.item} ${statusClass(3)}`}>
            <FaShippingFast className={styles.icon} />
            {status > 3 ? <p>Đã giao cho ĐVVC</p> : <p>Chờ giao cho ĐVVC</p>}
          </div>
          <div className={`${styles.item} ${statusClass(4)}`}>
            <BsInboxFill className={styles.icon} />
            {status > 4 ? <p>Đã nhận được hàng</p> : <p>Chờ giao hàng</p>}
          </div>
          <div className={`${styles.item} ${statusClass(5)}`}>
            <FaRegStar className={styles.icon} />
            <p>Đơn hàng đã hoàn thành</p>
          </div>
          <div className={styles.stepper}>
            <div className={styles.line}></div>

            <div className={`${styles.lineForego} ${statusLine(status)}`}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusOrder;
