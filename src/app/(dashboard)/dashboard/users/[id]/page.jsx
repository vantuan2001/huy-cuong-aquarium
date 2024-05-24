import styles from "./singleUser.module.css";
import Image from "next/image";

import { fetchUser } from "@/lib/users/data";
import UserForm from "@/components/dashboard/userForm/userForm";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await fetchUser(id);
  const userObject = JSON.parse(JSON.stringify(user));
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {userObject.username}
      </div>

      <div className={styles.formContainer}>
        <UserForm isUpdate={true} user={userObject} />
      </div>
    </div>
  );
};

export default SingleUserPage;
