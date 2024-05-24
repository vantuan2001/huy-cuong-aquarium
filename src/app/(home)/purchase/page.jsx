import { fetchOrderByUserId } from "@/lib/orders/data";
import PurchaseOrder from "./components/purchaseOrder/purchaseOrder";
import { auth } from "@/lib/auth";

const Purchase = async () => {
  const session = await auth();
  const userId = session?.user._id;
  const orders = await fetchOrderByUserId(userId);
  const ordersObject = JSON.parse(JSON.stringify(orders));
  return (
    <div className="container">
      {ordersObject.map((order) => (
        <PurchaseOrder order={order} key={order._id} />
      ))}
    </div>
  );
};

export default Purchase;
