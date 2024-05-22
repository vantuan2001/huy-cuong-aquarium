"use client";
import { useState } from "react";
import { addUser, updateUser } from "@/lib/users/action";
import Address from "@/components/address/address";
const UserForm = ({ user, isUpdate }) => {
  const [id, setId] = useState(user ? user._id : "");
  const [username, setUsername] = useState(user ? user.username : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [isAdmin, setIsAdmin] = useState(user ? user.isAdmin : "");
  const [address, setAddress] = useState(user ? user.address : "");
  const {
    getProvince,
    getDistrict,
    getWard,
    SelectProvince,
    SelectDistrict,
    SelectWard,
  } = Address();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("isAdmin", isAdmin);
      formData.append("address", address);

      if (isUpdate) {
        await updateUser(formData);
      } else {
        await addUser(formData);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
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
      <div className="inputContainer">
        <div className="formItem w50">
          <label>Họ và tên</label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            name="title"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formItem w50">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Nhập địa chỉ email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formItem w50">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            placeholder="Nhập số điện thoại"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="formItem w50">
          <label>Mật khẩu</label>
          <input type="password" name="password" />
        </div>

        <div className="formItem w50">
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
        <div className="formItem w50">
          <label>Địa chỉ</label>
          <input
            type="text"
            name="address"
            placeholder="Nhập địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="formItem w30">
          <label>Chọn tỉnh / thành phố</label>
          <SelectProvince />
        </div>
        <div className="formItem w30">
          <label>Chọn quận / huyện</label>
          <SelectDistrict />
        </div>
        <div className="formItem w30">
          <label>Chọn phường / xã</label>
          <SelectWard />
        </div>

        <button type="submit">
          {isUpdate ? "Cập nhật người dùng" : "Thêm người dùng"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
