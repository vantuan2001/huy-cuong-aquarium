import styles from "./orders.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import moment from "moment";
import Status from "@/components/dashboard/status/status";
import { fetchOrders, getOrders } from "@/lib/orders/data";
import SelectStatus from "./components/selectStatus";
import SelectPayments from "./components/selectPayments";
import ButtonOrder from "@/components/dashboard/buttonOrder/buttonOrder";

const OrdersPage = async ({ searchParams }) => {
  const { q = "", status = "", payments = "", page = 1 } = searchParams || {};

  const number = 10;
  const { count, orders } = await fetchOrders(
    q,
    status,
    payments,
    number,
    page
  );
  const ordersObject = JSON.parse(JSON.stringify(orders));
  const totalOrders = await getOrders();
  const totalPrice = totalOrders.reduce((total, item) => total + item.total, 0);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.filter}>
          <Search placeholder="Tìm kiếm khách hàng đặt hàng..." />
          <SelectStatus />
          <SelectPayments />
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Khách hàng</td>
            <td>Ngày tạo</td>
            <td>PT thanh toán</td>
            <td>Trạng thái</td>
            <td className="txt-end">Tổng tiền</td>
            <td className="txt-center">Hành động</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tổng {totalOrders.length} đơn hàng</td>
            <td></td>
            <td></td>
            <td></td>
            <td className="txt-end">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </td>
            <td></td>
          </tr>
          {ordersObject.map((order) => (
            <tr key={order._id}>
              <td>{order.username}</td>

              <td> {moment(order.createdAt).format("HH:mm DD/MM/YYYY")}</td>
              <td>
                {order.paymentMethods != "0"
                  ? "Thanh toán VNPAY"
                  : "Thanh toán khi nhận hàng"}
              </td>
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
      <Pagination count={count} />
    </div>
  );
};

export default OrdersPage;
