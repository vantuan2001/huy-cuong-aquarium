import { BsBasket, BsCreditCard2Front, BsHandbag } from "react-icons/bs";
import styles from "./dashboard.module.css";

import Chart from "@/components/dashboard/chart/chart";
import SellingProducts from "@/components/dashboard/sellingProducts/sellingProducts";
import RecentOrders from "@/components/dashboard/recentOrders/recentOrders";
import RecentReviews from "@/components/dashboard/recentReviews/recentReviews";

import { fetchReviews } from "@/lib/reviews/data";
import { getOrders } from "@/lib/orders/data";
import { getViewedProduct, getbestSellingProduct } from "@/lib/products/data";
import StatisticsCard from "@/components/dashboard/statisticsCard/statisticsCard";

const Dashboard = async () => {
  const q = "";
  const page = 1;
  const number = 5;
  const { reviews } = await fetchReviews(q, page, number);
  const reviewsObject = JSON.parse(JSON.stringify(reviews));
  const orders = await getOrders();
  const ordersObject = JSON.parse(JSON.stringify(orders));
  const productsSelling = await getbestSellingProduct(number);
  const productsViewed = await getViewedProduct(number);

  const totalPrice = () => {
    let total = 0;
    orders.forEach((item) => {
      total += item.total;
    });

    return total;
  };
  return (
    <div className={styles.container}>
      <div className={styles.sales}>
        <StatisticsCard
          icon={<BsHandbag />}
          title="Đơn đặt hàng"
          path="orders"
          data={orders.length}
        />
        <StatisticsCard
          icon={<BsCreditCard2Front />}
          title="Doanh thu"
          path="orders"
          data={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalPrice())}
          img="null"
        />
        <StatisticsCard
          icon={<BsBasket />}
          title="Đơn đặt hàng"
          path="orders"
          data={orders.length}
        />

        <RecentReviews reviews={reviewsObject} />
      </div>
      <Chart orders={ordersObject} />

      <div className={styles.recent}>
        <div style={{ flex: 1 }}>
          <h2>Sản phẩm bán chạy</h2>
          <SellingProducts products={productsSelling} type="sale" />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Sản phẩm được xem nhất</h2>
          <SellingProducts products={productsViewed} type="views" />
        </div>
      </div>
      <div className={styles.order}>
        <h2>Đơn hàng cần xác nhận</h2>
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
