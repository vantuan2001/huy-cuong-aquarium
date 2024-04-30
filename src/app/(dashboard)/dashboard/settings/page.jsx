import styles from "./settings.module.css";
import { fetchSetting } from "@/lib/data";
import ImgBannerForm from "./components/imgLogoForm";
import FormUpdate from "./components/formUpdate";
import BannerForm from "./components/bannerForm";

const SettingsPage = async () => {
  const id = "661a894e2c902060a3e28ed9";
  const setting = await fetchSetting(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <ImgBannerForm setting={setting} />
        <BannerForm setting={setting} />
      </div>
      <FormUpdate setting={setting} />
    </div>
  );
};

export default SettingsPage;
