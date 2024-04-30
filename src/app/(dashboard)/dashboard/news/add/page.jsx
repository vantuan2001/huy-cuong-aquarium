"use client";

import { addNews } from "@/lib/action";
import styles from "./addNews.module.css";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddNewsPage = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  return (
    <div className={styles.container}>
      <form className={styles.form} action={addNews}>
        <div className={styles.infoContainer}>
          <div className={styles.imgContainer}>
            <label htmlFor="img_logo">
              <input
                type="file"
                id="img_logo"
                name="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />

              <Image
                src={file ? URL.createObjectURL(file) : "/no-image.png"}
                alt=""
                fill
              />
            </label>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.input}>
            <label>Tên tin tức</label>
            <input type="text" name="title" placeholder="Nhập tên tin tức" />
            <textarea
              name="desc"
              id="desc"
              rows="16"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ display: "none" }}
            ></textarea>
            <ReactQuill
              className="editor"
              theme="snow"
              name="desc"
              placeholder="Nhập mô tả"
              value={desc}
              onChange={setDesc}
              style={{ minHeight: "300px" }}
            />
            <button type="submit">Thêm mới</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewsPage;
