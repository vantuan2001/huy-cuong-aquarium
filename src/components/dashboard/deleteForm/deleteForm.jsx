"use client";
import styles from "./deleteForm.module.css";

import { BsTrash } from "react-icons/bs";
import useSwal from "@/components/toast/useSwal";

const DeleteForm = ({ name, deleteMethod, type }) => {
  const { ToastDelete } = useSwal();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await ToastDelete({
        name: name,
        method: deleteMethod,
        id: type._id,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };
  return (
    <form onSubmit={handleDelete}>
      <button className={`${styles.button} ${styles.delete}`}>
        <BsTrash />
      </button>
    </form>
  );
};

export default DeleteForm;
