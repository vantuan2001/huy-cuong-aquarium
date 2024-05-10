"use server";

import bcrypt from "bcrypt";
import { User } from "../models";
import { signIn, signOut } from "../auth";
import { connectToDb } from "../utils";

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
