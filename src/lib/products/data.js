import { Product } from "../models";
import { connectToDb } from "../utils";

export const fetchProducts = async (q, b, c, page, number, sort) => {
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
    let sortOption = { createdAt: -1 }; // Default sort: newest
    if (sort === "best-view") {
      sortOption = { view: -1 };
    }
    if (sort === "best-selling") {
      sortOption = { sold: -1 };
    } else if (sort === "price-asc") {
      sortOption = { price: 1 };
    } else if (sort === "price-desc") {
      sortOption = { price: -1 };
    } else if (sort === "stock-asc") {
      sortOption = { stock: 1 };
    } else if (sort === "stock-desc") {
      sortOption = { stock: -1 };
    }
    const count = await Product.find(query).count();
    const products = await Product.find(query)
      .sort(sortOption)
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Không thể truy xuất phẩm!");
  }
};

export const fetchFeaturedProducts = async () => {
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
    return products;
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
