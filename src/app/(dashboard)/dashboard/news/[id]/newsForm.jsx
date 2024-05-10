"use client";
import { useState } from "react";
import styles from "./singleNews.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import { updateNews } from "@/lib/news/action";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewsForm = ({ news }) => {
  const [title, setTitle] = useState(news.title);
  const [desc, setDesc] = useState(news.desc);
  const [file, setFile] = useState(null);
  return (
    <form className={styles.form} action={updateNews}>
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
              src={file ? URL.createObjectURL(file) : news.img}
              alt=""
              fill
            />
          </label>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <input type="hidden" name="id" value={news._id} />
          <label>Tên tin tức</label>
          <input
            type="text"
            name="title"
            placeholder={news.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Mô tả tin tức</label>
          <textarea
            name="desc"
            id="desc"
            rows="16"
            placeholder={news.desc}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ display: "none" }}
          ></textarea>
          <ReactQuill
            className="editor"
            theme="snow"
            name="desc"
            value={desc}
            onChange={setDesc}
            style={{ minHeight: "300px" }}
          />

          <button>Cập nhật</button>
        </div>
      </div>
    </form>
  );
};

export default NewsForm;
