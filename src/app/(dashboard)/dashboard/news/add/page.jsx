"use client";

import styles from "./addNews.module.css";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { addNews } from "@/lib/news/action";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddNewsPage = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
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
            <label>Mô tả tin tức</label>
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
              modules={{
                toolbar: toolbarOptions,
              }}
            />
            <button type="submit">Thêm mới</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewsPage;
