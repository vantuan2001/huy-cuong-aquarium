import Status from "@/components/status/status";
import styles from "./recentOrders.module.css";

import { fetchOrders } from "@/lib/data";
import moment from "moment";

const RecentOrders = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const number = 5;
  const { orders } = await fetchOrders(q, number, page);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Khách hàng</td>
            <td>Trạng thái</td>
            <td>Ngày tạo</td>
            <td>PT thanh toán</td>
            <td>Tổng tiền</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.username}>
              <td>{order.username}</td>
              <td>
                <Status status={order.status} />
              </td>
              <td> {moment(order.createdAt).format("HH:mm DD/MM/YYYY")}</td>
              <td>
                {order.paymentMethods != "0"
                  ? "Thanh toán VNPAY"
                  : "Thanh toán khi nhận hàng"}
              </td>
              <td>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
