// import { fetchUser } from "@/lib/data";
import styles from "./singleUser.module.css";
import Image from "next/image";
import UserForm from "./userForm";
import { fetchUser } from "@/lib/users/data";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {user.username}
      </div>

      <div className={styles.formContainer}>
        <UserForm user={user} />
      </div>
    </div>
  );
};

export default SingleUserPage;
