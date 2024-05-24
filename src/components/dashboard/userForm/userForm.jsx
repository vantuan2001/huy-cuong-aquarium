"use client";
import { useState } from "react";
import { addUser, updateUser } from "@/lib/users/action";
import Address from "@/components/address/address";
import useSwal from "@/components/toast/useSwal";
const UserForm = ({ user, isUpdate }) => {
  const [id, setId] = useState(user ? user._id : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [isAdmin, setIsAdmin] = useState(user ? user.isAdmin : "");
  const [address, setAddress] = useState(user ? user.address : "");
  const {
    // getProvince,
    // getDistrict,
    // getWard,
    SelectProvince,
    SelectDistrict,
    SelectWard,
  } = Address();

  const { ToastSuccess } = useSwal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("isAdmin", isAdmin);
      formData.append("address", address);

      if (isUpdate) {
        await updateUser(formData);
        ToastSuccess({ title: "Cập nhật người dùng" });
      } else {
        await addUser(formData);
        ToastSuccess({ title: "Thêm người dùng" });
      }
    } catch (err) {
      console.error("Lỗi khi gửi biểu mẫu:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <div className="inputItem w50">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="username" className="label">
          Họ và tên
        </label>
      </div>
      <div className="inputItem w50">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="email" className="label">
          Email
        </label>
      </div>
      <div className="inputItem w50">
        <input
          type="text"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="phone" className="label">
          Số điện thoại
        </label>
      </div>
      <div className="inputItem w50">
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="password" className="label">
          Mật khẩu
        </label>
      </div>

      <div className="inputItem w50">
        <select
          name="isAdmin"
          id="isAdmin"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value)}
          className="select"
        >
          <option value={true}>Quản trị viên</option>
          <option value={false}>Khách hàng</option>
        </select>
        <label htmlFor="isAdmin" className="label">
          Vai trò
        </label>
      </div>
      <div className="inputItem w50">
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="address" className="label">
          Địa chỉ
        </label>
      </div>
      <div className="inputItem w30">
        <SelectProvince />
        <input
          type="text"
          className="input"
          id="province"
          style={{ display: "none" }}
        />
        <label htmlFor="province" className="label">
          Tỉnh thành
        </label>
      </div>
      <div className="inputItem w30">
        <SelectDistrict />
        <input
          type="text"
          className="input"
          id="district"
          style={{ display: "none" }}
        />
        <label htmlFor="district" className="label">
          Quận huyện
        </label>
      </div>
      <div className="inputItem w30">
        <SelectWard />
        <input
          type="text"
          className="input"
          id="ward"
          style={{ display: "none" }}
        />
        <label htmlFor="ward" className="label">
          Phường xã
        </label>
      </div>

      <button type="submit">
        {isUpdate ? "Cập nhật người dùng" : "Thêm người dùng"}
      </button>
    </form>
  );
};

export default UserForm;
