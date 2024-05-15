import { addUser } from "@/lib/users/action";
import styles from "./addUser.module.css";
import Image from "next/image";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} action={addUser}>
          <input type="hidden" name="id" value="id" />
          <div className={styles.item}>
            <label>Họ và tên</label>
            <input
              type="text"
              name="username"
              placeholder="Nhập họ và tên"
              required
            />
          </div>
          <div className={styles.item}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập địa chỉ email"
              required
            />
          </div>
          <div className={styles.item}>
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
          <div className={styles.item}>
            <label>Mật khẩu</label>
            <input type="password" name="password" required />
          </div>

          <div className={styles.item}>
            <label>Vai trò</label>
            <select name="isAdmin" id="isAdmin">
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
            />
          </div>

          <button>Thêm mới</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
