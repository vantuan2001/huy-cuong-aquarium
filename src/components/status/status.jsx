const Status = ({ status }) => {
  let statusMessage;

  if (status === 0) {
    statusMessage = "Đã huỷ";
  } else if (status === 1) {
    statusMessage = "Chờ xác nhận";
  } else if (status === 2) {
    statusMessage = "Xác nhận đơn hàng";
  } else if (status === 3) {
    statusMessage = "Đang giao cho ĐVVC";
  } else if (status === 4) {
    statusMessage = "Đang giao hàng";
  } else if (status >= 5) {
    statusMessage = "Đã nhận hàng";
  } else {
    statusMessage = "";
  }

  return statusMessage;
};

export default Status;
