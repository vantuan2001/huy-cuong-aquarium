import { BsBasket } from "react-icons/bs";
import styles from "./dashboard.module.css";
import Image from "next/image";
import Link from "next/link";
import Chart from "@/components/dashboard/chart/chart";
import SellingProducts from "@/components/dashboard/sellingProducts/sellingProducts";
import RecentOrders from "@/components/dashboard/recentOrders/recentOrders";
import RecentReviews from "@/components/dashboard/recentReviews/recentReviews";
import {
  fetchReviews,
  getOrders,
  getViewedProduct,
  getbestSellingProduct,
} from "@/lib/data";
import TotalSales from "@/components/dashboard/totalSales/totalSales";

const Dashboard = async () => {
  const q = "";
  const page = 1;
  const number = 5;
  const { reviews } = await fetchReviews(q, page, number);
  const reviewsObject = JSON.parse(JSON.stringify(reviews));
  const { orders } = await getOrders();
  const productsSelling = await getbestSellingProduct(number);
  const productsViewed = await getViewedProduct(number);
  return (
    <div className={styles.container}>
      <div className={styles.sales}>
        <div className={styles.salesItem}>
          <div className={styles.itemHeader}>
            <BsBasket className={styles.icon} />
            <Link href="/dashboard/orders" className={styles.link}>
              Xem tất cả
            </Link>
          </div>
          <h4>Đơn đặt hàng</h4>
          <div className={styles.info}>
            <span>{orders.length}</span>
            <Image src="/line-1.png" alt="" width={105} height={59} />
          </div>
        </div>
        <TotalSales orders={orders} />
        <RecentReviews reviews={reviewsObject} />
      </div>
      <Chart />

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
        <h2>Đơn hàng gần đây</h2>
        <RecentOrders />
      </div>
    </div>
  );
};

export default Dashboard;
