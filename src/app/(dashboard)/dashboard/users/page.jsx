import Search from "@/components/dashboard/search/search";
import styles from "./users.module.css";
import Image from "next/image";
import Link from "next/link";
import { fetchUsers } from "@/lib/data";
import Pagination from "@/components/dashboard/pagination/pagination";
import { deleteUser } from "@/lib/action";
import moment from "moment";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const number = 10;
  const { count, users } = await fetchUsers(q, page, number);
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
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
              <td>{user.isAdmin ? "Quản trị viên" : "Khách hàng"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Xem
                    </button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Xoá
                    </button>
                  </form>
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
