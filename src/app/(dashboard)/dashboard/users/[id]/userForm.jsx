import styles from "./singleUser.module.css";

const UserForm = () => {
  return (
    <form className={styles.form}>
      <input type="hidden" name="id" value="id" />
      <div className={styles.item}>
        <label>Họ và tên</label>
        <input type="text" name="username" placeholder="Nhập họ và tên" />
      </div>
      <div className={styles.item}>
        <label>Email</label>
        <input type="email" name="email" placeholder="Nhập địa chỉ email" />
      </div>
      <div className={styles.item}>
        <label>Số điện thoại</label>
        <input type="text" name="phone" placeholder="Nhập số điện thoại" />
      </div>
      <div className={styles.item}>
        <label>Mật khẩu</label>
        <input type="password" name="password" />
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

      <button>Cập nhật</button>
    </form>
  );
};

export default UserForm;
