"use client";

import { useEffect, useState } from "react";
import styles from "./chart.module.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const Chart = ({ orders }) => {
  // State để lưu trữ dữ liệu thống kê hàng ngày
  const [dailyStats, setDailyStats] = useState(null);
  // State để lưu trữ phạm vi thời gian đã chọn (mặc định là 30 ngày)
  const [timeRange, setTimeRange] = useState("30days");

  // Lấy và xử lý dữ liệu đơn hàng khi component mount hoặc khi đơn hàng thay đổi
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Xử lý dữ liệu đơn hàng để nhóm các giao dịch theo ngày và tính tổng số tiền cho mỗi ngày
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
        setDailyStats(dailyData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [orders]);

  // Hàm để lọc và tổng hợp dữ liệu dựa trên phạm vi thời gian đã chọn
  const filterData = (data, range) => {
    const now = new Date();
    const filteredData = [];

    if (range === "12months") {
      // Tổng hợp dữ liệu theo tháng cho 6 tháng gần đây
      const monthlyData = {};
      for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthIdentifier = `${date.getMonth() + 1}-${date.getFullYear()}`;
        monthlyData[monthIdentifier] = 0;
      }

      Object.keys(data).forEach((key) => {
        const [day, month, year] = key.split("-").map(Number);
        const monthIdentifier = `${month}-${year}`;
        if (monthlyData[monthIdentifier] !== undefined) {
          monthlyData[monthIdentifier] += data[key];
        }
      });

      // Thêm dữ liệu tổng hợp theo tháng vào mảng filteredData
      Object.keys(monthlyData).forEach((key) => {
        const [month, year] = key.split("-").map(Number);
        filteredData.push({
          name: `tháng ${month}-${year}`,
          price: monthlyData[key],
        });
      });

      // Đảo ngược để hiển thị từ cũ nhất đến mới nhất
      filteredData.reverse();
    } else if (range === "6weeks") {
      // Tổng hợp dữ liệu theo tuần cho 6 tuần gần đây
      const weeklyData = {};
      for (let i = 0; i < 6; i++) {
        const weekNumber = getWeekNumber(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - i * 7)
        );
        weeklyData[weekNumber] = 0;
      }

      Object.keys(data).forEach((key) => {
        const [day, month, year] = key.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const weekNumber = getWeekNumber(date);
        if (weeklyData[weekNumber] !== undefined) {
          weeklyData[weekNumber] += data[key];
        }
      });

      // Sắp xếp các tuần để đảm bảo hiển thị từ tuần cũ nhất đến tuần mới nhất
      const sortedWeeks = Object.keys(weeklyData).sort((a, b) => a - b);

      // Thêm dữ liệu tổng hợp theo tuần vào mảng filteredData
      sortedWeeks.forEach((week) => {
        filteredData.push({
          name: `tuần ${week}`,
          price: weeklyData[week],
        });
      });
    } else {
      // Tổng hợp dữ liệu theo ngày cho 30 ngày gần đây
      const daysCount = 30;
      for (let i = 0; i < daysCount; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        const dayIdentifier = `${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`;
        if (data[dayIdentifier]) {
          filteredData.push({
            name: dayIdentifier,
            price: data[dayIdentifier],
          });
        } else {
          filteredData.push({
            name: dayIdentifier,
            price: 0,
          });
        }
      }

      // Đảo ngược để hiển thị từ cũ nhất đến mới nhất
      filteredData.reverse();
    }
    return filteredData;
  };

  // Hàm để tính số tuần của một ngày nhất định
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Lọc dữ liệu dựa trên phạm vi thời gian đã chọn
  const data = dailyStats ? filterData(dailyStats, timeRange) : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Biểu Đồ Doanh Thu</h2>
        <div className={`inputItem ${styles.item}`}>
          <select
            name="isAdmin"
            id="isAdmin"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="select"
          >
            <option value="">Mặc định</option>
            <option value="30days">30 ngày gần đây</option>
            <option value="6weeks">6 tuần gần đây</option>
            <option value="12months">12 tháng gần đây</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            tickFormatter={(value) =>
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(value)
            }
          />
          <Legend />
          <Bar
            type="monotone"
            dataKey="price"
            name="Tổng tiền"
            fill="#82ca9d"
            dot={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
