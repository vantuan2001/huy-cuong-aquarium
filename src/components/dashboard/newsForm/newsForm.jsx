"use client";
import Image from "next/image";
import styles from "./newsForm.module.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import { addNews, updateNews } from "@/lib/news/action";
import useSwal from "@/components/toast/useSwal";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewsForm = ({ news, isUpdate }) => {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(news ? news._id : "");
  const [title, setTitle] = useState(news ? news.title : "");
  const [desc, setDesc] = useState(news ? news.desc : "");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["link", "image", "video"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ];
  const { ToastSuccess } = useSwal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("desc", desc);
      if (file) {
        formData.append("file", file);
      }

      if (isUpdate) {
        await updateNews(formData);
        ToastSuccess({ title: "Cập nhật tin tức" });
      } else {
        await addNews(formData);
        ToastSuccess({ title: "Thêm tin tức" });
      }
    } catch (err) {
      console.error("Lỗi khi gửi biểu mẫu:", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <div className="inputItem w50">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />
        <label htmlFor="title" className="label">
          Tên tin tức
        </label>
      </div>

      <div className="inputItem w50">
        <input
          type="file"
          id="img"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="input"
        />
        <label htmlFor="img" className="label">
          Hình ảnh
        </label>
      </div>
      {news ? (
        <div className={styles.imgContainer}>
          <Image
            src={file ? URL.createObjectURL(file) : news?.img}
            alt=""
            fill
            className={styles.img}
          />
        </div>
      ) : (
        file && (
          <div className={styles.imgContainer}>
            <Image
              src={file ? URL.createObjectURL(file) : "/no-image.png"}
              alt=""
              fill
              className={styles.img}
            />
          </div>
        )
      )}

      <div className="w100">
        <label
          htmlFor="desc"
          style={{ fontSize: "14px", marginBottom: "10px" }}
        >
          Mô tả tin tức
        </label>

        <ReactQuill
          className={`editor ${styles.editor}`}
          theme="snow"
          name="desc"
          value={desc}
          onChange={setDesc}
          modules={{ toolbar: toolbarOptions }}
        />
      </div>
      <button type="submit">
        {isUpdate ? "Cập nhật tin tức" : "Thêm tin tức"}
      </button>
    </form>
  );
};

export default NewsForm;
