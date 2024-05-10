import styles from "./status.module.css";

const Status = ({ status }) => {
  let statusMessage;

  if (status === 0) {
    statusMessage = (
      <span className={`${styles.status} ${styles.danger}`}>Đã huỷ</span>
    );
  } else if (status === 1) {
    statusMessage = (
      <span className={`${styles.status} ${styles.warning}`}>Chờ xác nhận</span>
    );
  } else if (status === 2) {
    statusMessage = (
      <span className={`${styles.status} ${styles.info}`}>
        Xác nhận đơn hàng
      </span>
    );
  } else if (status === 3) {
    statusMessage = (
      <span className={`${styles.status} ${styles.primary}`}>
        Đang giao cho ĐVVC
      </span>
    );
  } else if (status === 4) {
    statusMessage = (
      <span className={`${styles.status} ${styles.secondary}`}>
        Đang giao hàng
      </span>
    );
  } else if (status >= 5) {
    statusMessage = (
      <span className={`${styles.status} ${styles.success}`}>Đã nhận hàng</span>
    );
  } else {
    statusMessage = "";
  }

  return statusMessage;
};

export default Status;
