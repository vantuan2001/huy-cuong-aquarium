"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../settings.module.css";
import { updateLogo } from "@/lib/settings/action";

const ImgBannerForm = ({ setting }) => {
  const [imgLogo, setImgLogo] = useState(null);
  const [id, setId] = useState(setting._id);

  return (
    <form className={styles.imgContainer} action={updateLogo}>
      <label htmlFor="imgLogo">
        <input
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ display: "none" }}
        />
        <input
          type="file"
          id="imgLogo"
          name="imgLogo"
          style={{ display: "none" }}
          onChange={(e) => setImgLogo(e.target.files[0])}
        />

        <Image
          src={imgLogo ? URL.createObjectURL(imgLogo) : setting.imgLogo}
          alt=""
          width={100}
          height={100}
        />
      </label>
      <button className={styles.button}>Cập nhật</button>
    </form>
  );
};

export default ImgBannerForm;
