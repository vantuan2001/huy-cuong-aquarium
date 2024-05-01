"use server";

import axios from "axios";
import {
  User,
  Category,
  Brand,
  Product,
  News,
  Review,
  Order,
  Setting,
} from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt";
import { signIn, signOut } from "./auth";

// Auth
export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, phone, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Mật khẩu không khớp." };
  }

  try {
    connectToDb();

    const phoneuser = await User.findOne({ phone });
    const emailuser = await User.findOne({ email });

    if (phoneuser) {
      return { error: "Số điện thoại đã tồn tại." };
    } else if (emailuser) {
      return { error: "Địa chỉ email đã tồn tại." };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Đã lưu vào cơ sở dữ liệu.");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Đã có lỗi trong quá trình đăng ký!" };
  }
};

export const login = async (prevState, formData) => {
  const { phone, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { phone, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Số điện thoại hoặc mật khẩu không đúng." };
    }
    throw err;
  }
};

// User
export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      isAdmin,
      address,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Tạo người dùng không thành công!");
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Xóa người dùng không thành công!");
  }

  revalidatePath("/dashboard/users");
};

// Category
export const addCategory = async (formData) => {
  const { name } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );

    const { url } = uploadRes.data;
    connectToDb();
    const newCategory = new Category({
      name,
      img_logo: url,
    });

    await newCategory.save();
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/categories");
  revalidatePath("/products");
  revalidatePath("/news");
  redirect("/dashboard/categories");
};

export const updateCategory = async (formData) => {
  const { id, name } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    connectToDb();
    if (file.name === "undefined") {
      const updateFields = {
        name,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Category.findByIdAndUpdate(id, updateFields);
    } else {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateFields = {
        name,
        img_logo: url,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Category.findByIdAndUpdate(id, updateFields);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật danh mục!");
  }

  revalidatePath("/dashboard/categories");
  revalidatePath("/products");
  revalidatePath("/news");
  redirect("/dashboard/categories");
};

export const deleteCategory = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await Category.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/categories");
};

// Brand
export const addBrand = async (formData) => {
  const { name } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );

    const { url } = uploadRes.data;
    connectToDb();
    const newBrand = new Brand({
      name,
      img: url,
    });

    await newBrand.save();
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/brands");
  redirect("/dashboard/brands");
};

export const updateBrand = async (formData) => {
  const { id, name } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    connectToDb();
    if (file.name === "undefined") {
      const updateFields = {
        name,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Brand.findByIdAndUpdate(id, updateFields);
    } else {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateFields = {
        name,
        img: url,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Brand.findByIdAndUpdate(id, updateFields);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật thương hiệu!");
  }

  revalidatePath("/dashboard/brands");
  revalidatePath("/products");
  redirect("/dashboard/brands");
};

export const deleteBrand = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await Brand.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/brands");
};

// Product
export const addProduct = async (formData) => {
  const { title, desc, info, category, brand, stock, price, costPrice } =
    Object.fromEntries(formData);
  const file = formData.get("file");
  // console.log(title, info, desc, category, brand, stock, price, file);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );

    const { url } = uploadRes.data;
    connectToDb();
    const newProduct = new Product({
      title,
      costPrice,
      price,
      stock,
      info,
      desc,
      category,
      brand,
      img: url,
    });
    console.log("save data");
    await newProduct.save();
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const {
    id,
    title,
    costPrice,
    price,
    stock,
    sold,
    views,
    info,
    desc,
    category,
    brand,
  } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");

  try {
    connectToDb();
    if (file.name === "undefined") {
      const updateFields = {
        title,
        costPrice,
        price,
        stock,
        sold,
        views,
        info,
        desc,
        category,
        brand,
      };

      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Product.findByIdAndUpdate(id, updateFields);
    } else {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateFields = {
        title,
        costPrice,
        price,
        stock,
        sold,
        views,
        info,
        desc,
        category,
        brand,
        img: url,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await Product.findByIdAndUpdate(id, updateFields);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật sản phẩm!");
  }

  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await Product.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/products");
};

// News
export const addNews = async (formData) => {
  const { title, desc } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );

    const { url } = uploadRes.data;
    connectToDb();
    const newNews = new News({
      title,
      desc,
      img: url,
    });

    await newNews.save();
    console.log("Đã lưu vào cơ sở dữ liệu.");
  } catch (err) {
    console.log(err);
  }
  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  redirect("/dashboard/news");
};

export const updateNews = async (formData) => {
  const { id, title, desc } = Object.fromEntries(formData);
  const file = formData.get("file");
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "uploads");
  try {
    connectToDb();
    if (file.name === "undefined") {
      const updateFields = {
        title,
        desc,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await News.findByIdAndUpdate(id, updateFields);
    } else {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const updateFields = {
        title,
        desc,
        img: url,
      };
      Object.keys(updateFields).forEach(
        (key) =>
          (updateFields[key] === "" || undefined) && delete updateFields[key]
      );

      await News.findByIdAndUpdate(id, updateFields);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật tin tức!");
  }

  revalidatePath("/dashboard/news");
  revalidatePath("/news");
  redirect("/dashboard/news");
};

export const deleteNews = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await News.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/news");
  revalidatePath("/news");
};

// Review
export const addReview = async (formData) => {
  const { rating, username, email, comment, postId, userId } =
    Object.fromEntries(formData);

  try {
    connectToDb();
    const newReview = new Review({
      rating,
      username,
      email,
      comment,
      postId,
      userId,
    });
    console.log("save data");
    await newReview.save();
  } catch (err) {
    console.log(err);
  }
};

export const deleteReview = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Review.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/reviews");
};

// Order
export const addOrder = async (formData) => {
  const {
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    total,
    userId,
  } = Object.fromEntries(formData);
  console.log(
    username,
    phone,
    email,
    address,
    products,
    note,
    paymentMethods,
    total,
    userId
  );
  // try {
  //   connectToDb();
  //   const newOrder = new Order({
  //     username,
  //     phone,
  //     email,
  //     address,
  //     products,
  //     note,
  //     paymentMethods,

  //     total,
  //     userId,
  //   });

  //   await newOrder.save();
  // } catch (err) {
  //   console.log(err);
  // }
  // revalidatePath("/dashboard/order");
  // redirect("/dashboard/order");
};

export const deleteOrder = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Order.findByIdAndDelete(id);
    console.log("Xóa khỏi cơ sở dữ liệu");
  } catch (err) {
    console.log(err);
    return { error: "Có điều gì đó đã sai" };
  }
  revalidatePath("/dashboard/orders");
};

export const updateStatusOrder = async (formData) => {
  const { id, status } = Object.fromEntries(formData);
  try {
    connectToDb();
    const updateFields = {
      status: 1 + +status,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật đơn hàng!");
  }

  revalidatePath("/dashboard/orders");
  redirect("/dashboard/orders");
};

export const cancelOrder = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    const updateFields = {
      status: 0,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    console.log("Đã lưu vào cơ sở dữ liệu.");
    await Order.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể huỷ đơn hàng!");
  }
  revalidatePath("/dashboard/orders");
};

// Settings
export const updateLogo = async (formData) => {
  const { id } = Object.fromEntries(formData);
  const imgLogo = formData.get("imgLogo");
  const data = new FormData();
  data.append("file", imgLogo);
  data.append("upload_preset", "uploads");

  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );
    connectToDb();
    const { url } = uploadRes.data;
    const updateFields = {
      imgLogo: url,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    console.log("Đã lưu vào cơ sở dữ liệu.");
    await Setting.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật hình logo!");
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  redirect("/dashboard/settings");
};

export const updateBanner = async (formData) => {
  const { id } = Object.fromEntries(formData);
  const imgBanner = formData.get("imgBanner");
  const data = new FormData();
  data.append("file", imgBanner);
  data.append("upload_preset", "uploads");

  try {
    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dqf9hhpay/image/upload",
      data
    );
    connectToDb();
    const { url } = uploadRes.data;
    const updateFields = {
      imgBanner: url,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    console.log("Đã lưu vào cơ sở dữ liệu.");
    await Setting.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật hình banner!");
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  redirect("/dashboard/settings");
};

export const updateSetting = async (formData) => {
  const { id, title, email, phone, address } = Object.fromEntries(formData);
  console.log(id, title, email, phone, address);

  try {
    connectToDb();
    const updateFields = {
      title,
      email,
      phone,
      address,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    console.log("Đã lưu vào cơ sở dữ liệu.");
    await Setting.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Không thể cập nhật cài đặt!");
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  redirect("/dashboard/settings");
};
