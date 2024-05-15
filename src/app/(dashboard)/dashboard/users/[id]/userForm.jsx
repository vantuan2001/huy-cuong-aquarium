"use client";
import { useState } from "react";
import styles from "./singleUser.module.css";
import { updateUser } from "@/lib/users/action";

const UserForm = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [address, setAddress] = useState(user.address);

  return (
    <form className={styles.form} action={updateUser}>
      <input type="hidden" name="id" value="id" />
      <div className={styles.item}>
        <label>Họ và tên</label>
        <input
          type="text"
          name="username"
          placeholder="Nhập họ và tên"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Nhập địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label>Số điện thoại</label>
        <input
          type="text"
          name="phone"
          placeholder="Nhập số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label>Mật khẩu</label>
        <input type="password" name="password" />
      </div>

      <div className={styles.item}>
        <label>Vai trò</label>
        <select
          name="isAdmin"
          id="isAdmin"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value)}
        >
          <option value={true} selected="isAdmin">
            Quản trị viên
          </option>
          <option value={false} selected="isAdmin">
            Khách hàng
          </option>
        </select>
      </div>
      <div className={styles.item} style={{ width: "100%" }}>
        <label>Địa chỉ</label>
        <textarea
          type="text"
          name="address"
          placeholder="Nhập địa chỉ"
          style={{ width: "100%", resize: "none" }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button>Cập nhật</button>
    </form>
  );
};

export default UserForm;
