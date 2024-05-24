import {
  BsBasket,
  BsCreditCard2Front,
  BsHandbag,
  BsLayoutTextWindow,
  BsNewspaper,
  BsPersonCircle,
  BsTags,
} from "react-icons/bs";
import styles from "./dashboard.module.css";

import Chart from "@/components/dashboard/chart/chart";
import SellingProducts from "@/components/dashboard/sellingProducts/sellingProducts";
import RecentOrders from "@/components/dashboard/recentOrders/recentOrders";
import RecentReviews from "@/components/dashboard/recentReviews/recentReviews";

import { fetchReviews } from "@/lib/reviews/data";
import { getOrders } from "@/lib/orders/data";
import {
  getProducts,
  getViewedProduct,
  getbestSellingProduct,
} from "@/lib/products/data";
import StatisticsCard from "@/components/dashboard/statisticsCard/statisticsCard";
import { getBrands } from "@/lib/brands/data";
import { getCategories } from "@/lib/categories/data";
import { getAllNews } from "@/lib/news/data";
import { getUsers } from "@/lib/users/data";

const Dashboard = async () => {
  const q = "";
  const page = 1;
  const number = 5;
  const { reviews } = await fetchReviews(q, page, number);
  const productsSelling = await getbestSellingProduct(number);
  const productsViewed = await getViewedProduct(number);
  const brands = await getBrands();
  const categories = await getCategories();
  const orders = await getOrders();
  const news = await getAllNews();
  const products = await getProducts();
  const users = await getUsers();

  const [reviewsObject, ordersObject] = [reviews, orders].map((item) =>
    JSON.parse(JSON.stringify(item))
  );

  const totalPrice = orders.reduce((total, item) => total + item.total, 0);

  return (
    <div className={styles.container}>
      <div className={styles.sales}>
        <StatisticsCard
          icon={<BsHandbag />}
          title="Sản Phẩm"
          path="products"
          data={products.length}
        />
        <StatisticsCard
          icon={<BsCreditCard2Front />}
          title="Tổng Doanh thu"
          path="orders"
          data={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalPrice)}
          img="null"
        />
        <StatisticsCard
          icon={<BsBasket />}
          title="Đơn Đặt Hàng"
          path="orders"
          img="/line-2.png"
          data={orders.length}
        />

        <RecentReviews reviews={reviewsObject} />
      </div>
      <div className={styles.total}>
        <StatisticsCard
          icon={<BsPersonCircle />}
          title="Người Dùng"
          data={users.length}
          small={true}
        />
        <StatisticsCard
          icon={<BsNewspaper />}
          title="Tin Tức"
          data={news.length}
          small={true}
        />
        <StatisticsCard
          icon={<BsLayoutTextWindow />}
          title="Danh Mục"
          data={categories.length}
          small={true}
        />
        <StatisticsCard
          icon={<BsTags />}
          title="Thương Hiệu"
          data={brands.length}
          small={true}
        />
      </div>
      <Chart orders={ordersObject} />

      <div className={styles.recent}>
        <div style={{ flex: 1 }}>
          <h2>Sản Phẩm Bán Chạy</h2>
          <SellingProducts products={productsSelling} type="sale" />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Sản Phẩm Được Xem Nhiều Nhất</h2>
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
