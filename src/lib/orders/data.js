import { Order } from "../models";
import { connectToDb } from "../utils";

export const fetchOrders = async (q, status, payments, number, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();

    const query = {};

    if (q) {
      query.username = { $regex: regex };
    }
    if (status) {
      query.status = status;
    }
    if (payments) {
      query.paymentMethods = payments;
    }

    const count = await Order.find(query).count();
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, orders };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đơn hàng!");
  }
};

export const getOrders = async () => {
  try {
    connectToDb();
    const orders = await Order.find();
    return orders;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đơn hàng!");
  }
};

export const fetchOrder = async (id) => {
  try {
    connectToDb();
    const order = await Order.findById(id);
    return order;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đơn hàng!");
  }
};

export const fetchOrderByUserId = async (userId) => {
  try {
    connectToDb();
    const order = await Order.find({ userId: userId }).sort({ createdAt: -1 });
    return order;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đơn hàng!");
  }
};

export const fetchOrdersUnconfirmed = async () => {
  const status = 1;
  try {
    connectToDb();
    const order = await Order.find({ status: status }).sort({ createdAt: -1 });
    return order;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đơn hàng!");
  }
};
