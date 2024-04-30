"use client";

import styles from "./addProduct.module.css";
import Image from "next/image";
import { useState } from "react";
import SingleNewsPage from "./SingleNewsPage";

const AddProduct = () => {
  const [file, setFile] = useState(null);
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.infoContainer}>
          <div className={styles.imgContainer}>
            <label htmlFor="img">
              <input
                type="file"
                id="img"
                name="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />

              <Image
                // src="/no-image.png"
                src={file ? URL.createObjectURL(file) : "/no-image.png"}
                alt=""
                fill
              />
            </label>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <input type="text" placeholder="title" name="title" required />
            <SingleNewsPage />
            <input type="number" placeholder="price" name="price" required />
            <input type="number" placeholder="stock" name="stock" required />
            <input type="text" placeholder="color" name="color" />
            <input type="text" placeholder="size" name="size" />
            <textarea
              required
              name="desc"
              id="desc"
              rows="16"
              placeholder="Description"
            ></textarea>
            <button type="submit">Thêm mới</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
