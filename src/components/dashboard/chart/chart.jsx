"use client";

import { useEffect, useState } from "react";
import styles from "./chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Chart = ({ orders }) => {
  const [dailyStats, setDailyStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Xử lý dữ liệu để nhóm các giao dịch theo ngày và tính tổng số tiền cho mỗi ngày
        const dailyData = {};
        orders.forEach((transaction) => {
          const date = new Date(transaction.createdAt);
          const dayIdentifier = `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`;
          if (!dailyData[dayIdentifier]) {
            dailyData[dayIdentifier] = 0;
          }
          dailyData[dayIdentifier] += transaction.total;
        });

        // Đặt dữ liệu thống kê hàng ngày đã tính toán
        setDailyStats(dailyData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const data = dailyStats
    ? Object.keys(dailyStats).map((dayIdentifier) => ({
        name: dayIdentifier,
        price: dailyStats[dayIdentifier],
      }))
    : [];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tóm tắt hàng ngày</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
          />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            name="Tổng tiền"
            stroke="#82ca9d"
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
