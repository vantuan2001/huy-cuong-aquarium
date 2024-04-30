import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img_logo: {
      type: String,
    },
  },
  { timestamps: true }
);

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    info: {
      type: String,
    },
    img: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    sold: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    note: {
      type: String,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    paymentMethods: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: true,
    },
    codeBill: {
      type: Number,
    },
  },
  { timestamps: true }
);

const settingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    imgLogo: {
      type: String,
    },
    imgBanner: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Category =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);
export const Brand =
  mongoose.models?.Brand || mongoose.model("Brand", brandSchema);
export const Product =
  mongoose.models?.Product || mongoose.model("Product", productSchema);
export const Order =
  mongoose.models?.Order || mongoose.model("Order", orderSchema);
export const Review =
  mongoose.models?.Review || mongoose.model("Review", reviewSchema);
export const News = mongoose.models?.News || mongoose.model("News", newsSchema);
export const Setting =
  mongoose.models?.Setting || mongoose.model("Setting", settingSchema);
