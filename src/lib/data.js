import {
  Brand,
  Category,
  News,
  Order,
  Product,
  Review,
  Setting,
  User,
} from "./models";
import { connectToDb } from "./utils";

// User
export const fetchUsers = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;
  try {
    connectToDb();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    console.log(error);
    throw new Error("Không thể truy xuất người dùng!");
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

// Category

export const getCategories = async () => {
  try {
    connectToDb();
    const categories = await Category.find();
    return categories;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất danh mục!");
  }
};

export const fetchCategories = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;
  try {
    connectToDb();
    const count = await Category.find({ name: { $regex: regex } }).count();
    const categories = await Category.find({ name: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, categories };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất danh mục!");
  }
};

export const fetchCategory = async (id) => {
  try {
    connectToDb();
    const category = await Category.findById(id);
    return category;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất danh mục!");
  }
};

// Brand
export const fetchBrands = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;
  try {
    connectToDb();
    const count = await Brand.find({ name: { $regex: regex } }).count();
    const brands = await Brand.find({ name: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, brands };
  } catch (error) {
    console.log(error);
    throw new Error("Không thể truy xuất thương hiệu!");
  }
};

export const fetchBrand = async (id) => {
  try {
    connectToDb();
    const brand = await Brand.findById(id);
    return brand;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất thương hiệu!");
  }
};

// Product

export const fetchProducts = async (q, b, c, page, number) => {
  const regex = new RegExp(q, "i");
  const brandFilter = new RegExp(b, "i");
  const categoryFilter = new RegExp(c, "i");
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const query = {};
    if (q) {
      query.title = { $regex: regex };
    }
    if (b) {
      query.brand = { $regex: brandFilter };
    }
    if (c) {
      query.category = { $regex: categoryFilter };
    }
    const count = await Product.find(query).count();
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất phẩm!");
  }
};

export const fetchProductsNews = async () => {
  try {
    connectToDb();

    const products = await Product.find().sort({ createdAt: -1 }).limit(10);

    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất phẩm!");
  }
};

export const getbestSellingProduct = async (number) => {
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const products = await Product.find()
      .sort({ sold: -1 })
      .limit(ITEM_PER_PAGE);

    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất phẩm!");
  }
};

export const getViewedProduct = async (number) => {
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const products = await Product.find()
      .sort({ views: -1 })
      .limit(ITEM_PER_PAGE);

    return products;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất phẩm!");
  }
};

export const getProducts = async () => {
  try {
    connectToDb();
    const products = await Product.find();
    return { products };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất phẩm!");
  }
};

export const fetchProduct = async (_id) => {
  try {
    connectToDb();
    const product = await Product.findById(_id);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất phẩm!");
  }
};

export const fetchProductTitle = async (title) => {
  try {
    connectToDb();
    const product = await Product.findOne(title);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất sản phẩm!");
  }
};

// News
export const fetchNews = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const count = await News.find({ title: { $regex: regex } }).count();
    const news = await News.find({ title: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, news };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất tức!");
  }
};

export const fetchLimitNews = async (limit) => {
  const ITEM_PER_PAGE = limit;

  try {
    connectToDb();
    const news = await News.find().limit(ITEM_PER_PAGE);
    return news;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất tin tức!");
  }
};

export const getNews = async (id) => {
  try {
    connectToDb();
    const news = await News.findById(id);
    return news;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất tin tức!");
  }
};

// Reviews
export const fetchReviews = async (q, page, number) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const count = await Review.find({ comment: { $regex: regex } }).count();
    const reviews = await Review.find({ comment: { $regex: regex } })
      .sort({ createdAt: -1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, reviews };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đánh giá!");
  }
};

export const fetchReview = async (postId) => {
  try {
    connectToDb();
    const review = await Review.findOne(postId);
    return review;
    // const review = await Review.findOne(id);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất đánh giá!");
  }
};

// Order

export const fetchOrders = async (q, number, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = number;

  try {
    connectToDb();
    const count = await Order.find({ username: { $regex: regex } }).count();
    const orders = await Order.find({ username: { $regex: regex } })
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
    const orders = await Order.find().sort({ createdAt: -1 });
    return { orders };
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

// Setting
export const fetchSetting = async (id) => {
  try {
    connectToDb();
    const setting = await Setting.findById(id);
    return setting;
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất cài đặt!");
  }
};
