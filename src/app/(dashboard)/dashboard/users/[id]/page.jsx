// import { fetchUser } from "@/lib/data";
import styles from "./singleUser.module.css";
import Image from "next/image";
import UserForm from "./userForm";

// const getData = async (title) => {
//   const res = await fetch(`https://huy-cuong-aquarium.vercel.app/api/user/${title}`, {
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) {
//     throw new Error("Đã xảy ra lỗi");
//   }

//   return res.json();
// };

const SingleUserPage = async () => {
  // const { id } = params;
  // const user = await fetchUser(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <UserForm />
      </div>
    </div>
  );
};

export default SingleUserPage;
