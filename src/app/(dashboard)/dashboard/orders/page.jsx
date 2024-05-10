import Link from "next/link";
import styles from "./orders.module.css";
import Search from "@/components/dashboard/search/search";
import Pagination from "@/components/dashboard/pagination/pagination";
import moment from "moment";
import Status from "@/components/dashboard/status/status";
import { fetchOrders, getOrders } from "@/lib/orders/data";
import { cancelOrder, updateStatusOrder } from "@/lib/orders/action";
import SelectStatus from "./components/selectStatus";
import SelectPayments from "./components/selectPayments";

const OrdersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const status = searchParams?.status || "";
  const payments = searchParams?.payments || "";
  const page = searchParams?.page || 1;
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

  const totalPrice = () => {
    let total = 0;
    totalOrders.forEach((item) => {
      total += item.total;
    });
    return total;
  };

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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="txt-end">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice())}
            </td>
            <td></td>
          </tr>
          {ordersObject.map((order) => {
            const next = order.status < 1 || order.status >= 5;
            const cancel = order.status === 1;
            return (
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
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/orders/${order._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        Xem
                      </button>
                    </Link>
                    <>
                      <form action={updateStatusOrder}>
                        <input type="hidden" name="id" value={order._id} />
                        <input
                          type="hidden"
                          name="status"
                          value={order.status}
                        />
                        <button
                          className={`${styles.button} ${styles.next}`}
                          disabled={next}
                        >
                          Tiếp theo
                        </button>
                      </form>
                      <form action={cancelOrder}>
                        <input type="hidden" name="id" value={order._id} />
                        <button
                          className={`${styles.button} ${styles.delete}`}
                          disabled={!cancel}
                        >
                          Huỷ
                        </button>
                      </form>
                    </>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default OrdersPage;
