import Status from "@/components/dashboard/status/status";
import styles from "./recentOrders.module.css";
import moment from "moment";
import { fetchOrdersUnconfirmed } from "@/lib/orders/data";
import ButtonOrder from "../buttonOrder/buttonOrder";

const RecentOrders = async () => {
  const orders = await fetchOrdersUnconfirmed();
  const ordersObject = JSON.parse(JSON.stringify(orders));
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Khách hàng</td>
            <td>Ngày tạo</td>
            <td>Giỏ hàng</td>
            <td>Trạng thái</td>
            <td style={{ textAlign: "right" }}>Tổng tiền</td>
            <td style={{ textAlign: "center" }}>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {ordersObject.length === 0
            ? ""
            : ordersObject.map((order) => (
                <tr key={order._id}>
                  <td>{order.username}</td>
                  <td>{moment(order.createdAt).format("HH:mm DD/MM/YYYY")}</td>
                  <td>{order.products.length} Sản phẩm</td>
                  <td>
                    <Status status={order.status} />
                  </td>
                  <td className="txt-end">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.total)}
                  </td>

                  <td>
                    <ButtonOrder order={order} />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {ordersObject.length === 0 ? (
        <span
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          Bạn không có đơn hàng cần xác nhận
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default RecentOrders;
