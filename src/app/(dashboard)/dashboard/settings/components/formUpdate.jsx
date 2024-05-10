"use client";

import { useState } from "react";
import styles from "../settings.module.css";
import { updateSetting } from "@/lib/settings/action";

const FormUpdate = ({ setting }) => {
  const [id, setId] = useState(setting._id);
  const [title, setTitle] = useState(setting.title);
  const [email, setEmail] = useState(setting.email);
  const [phone, setPhone] = useState(setting.phone);
  const [address, setAddress] = useState(setting.address);
  return (
    <form className={styles.inputContainer} action={updateSetting}>
      <div className={styles.input}>
        <input
          type="hidden"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <label>Tên cửa hàng</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Địa chỉ email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Số điện thoại</label>
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Địa chỉ cửa hàng</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default FormUpdate;
