import Search from "@/components/dashboard/search/search";
import styles from "./users.module.css";
import Link from "next/link";
import Pagination from "@/components/dashboard/pagination/pagination";
import moment from "moment";
import { fetchUsers } from "@/lib/users/data";
import { deleteUser } from "@/lib/users/action";
import { BsPencilSquare } from "react-icons/bs";
import DeleteForm from "@/components/dashboard/deleteForm/deleteForm";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const number = 10;
  const { count, users } = await fetchUsers(q, page, number);
  const usersObject = JSON.parse(JSON.stringify(users));
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Tìm kiếm tài khoản..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Thêm mới</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Họ và tên</td>
            <td>Số điện thoại</td>
            <td>Email</td>
            <td>Ngày tạo</td>
            <td>Vai trò</td>
            <td>Hành động</td>
          </tr>
        </thead>
        <tbody>
          {usersObject.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <div className={styles.avatar}>
                    <div className={styles.text}>
                      {user.username.toString().slice(0, 1)}
                    </div>
                  </div>
                  {user.username}
                </div>
              </td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
              <td>{user.isAdmin ? "Quản trị viên" : "Khách hàng"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      <BsPencilSquare />
                    </button>
                  </Link>
                  <DeleteForm
                    name="người dùng"
                    deleteMethod={deleteUser}
                    type={user}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
