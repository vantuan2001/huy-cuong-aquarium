import { fetchOrderByUserId } from "@/lib/data";
import PurchaseOrder from "./components/purchaseOrder/purchaseOrder";
import styles from "./purchase.module.css";
import { auth } from "@/lib/auth";

const Purchase = async () => {
  const session = await auth();
  const userId = session?.user._id;
  const orders = await fetchOrderByUserId(userId);
  const ordersObject = JSON.parse(JSON.stringify(orders));
  return (
    <div className={styles.container}>
      {ordersObject.map((order) => (
        <PurchaseOrder order={order} key={order._id} />
      ))}
    </div>
  );
};

export default Purchase;
