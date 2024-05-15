"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./address.module.css";

const Address = (error) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [getProvince, setGetProvince] = useState("");
  const [getDistrict, setGetDistrict] = useState("");
  const [getWard, setGetWard] = useState("");

  useEffect(() => {
    // Lấy danh sách tỉnh/thành phố
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    if (provinceId === "0") {
      setDistricts([]);
      setWards([]);
      return;
    }

    // Lấy tỉnh/thành phố đã chọn
    const province = provinces.find((province) => province.id === provinceId);
    if (!province) {
      console.error("Province not found");
      return;
    }

    // Lưu trữ thông tin tỉnh/thành phố đã chọn vào state
    setGetProvince(province.full_name);

    // Lấy danh sách quận/huyện
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
      );
      setDistricts(response.data.data);
      setWards([]);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    if (districtId === "0") {
      setWards([]);
      return;
    }

    // Lấy quận/huyện đã chọn
    const district = districts.find((district) => district.id === districtId);
    if (!district) {
      console.error("District not found");
      return;
    }

    // Lưu trữ thông tin quận/huyện đã chọn vào state
    setGetDistrict(district.full_name);

    // Lấy danh sách phường/xã
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
      );
      setWards(response.data.data);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleWardChange = (e) => {
    const wardId = e.target.value;

    // Lấy quận/huyện đã chọn
    const ward = wards.find((ward) => ward.id === wardId);
    if (!ward) {
      console.error("ward not found");
      return;
    }

    // Lưu trữ thông tin quận/huyện đã chọn vào state
    setGetWard(ward.full_name);
  };

  const SelectProvince = () => {
    return (
      <div className={styles.item}>
        <select
          value={getProvince}
          className={styles.select}
          onChange={handleProvinceChange}
          title="Chọn Tỉnh Thành"
        >
          {!getProvince ? (
            <option value="0">Chọn Tỉnh Thành</option>
          ) : (
            <>
              <option value={getProvince}>{getProvince}</option>
            </>
          )}
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.full_name}
            </option>
          ))}
        </select>
        {error && !getProvince ? (
          <div className="error">Xin vui lòng chọn tỉnh thành</div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const SelectDistrict = () => {
    return (
      <div className={styles.item}>
        <select
          className={styles.select}
          onChange={handleDistrictChange}
          title="Chọn Quận Huyện"
          value={getDistrict}
        >
          {!getDistrict ? (
            <option value="0">Chọn Quận Huyện</option>
          ) : (
            <>
              <option value={getDistrict}>{getDistrict}</option>
            </>
          )}

          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.full_name}
            </option>
          ))}
        </select>
        {error && !getDistrict ? (
          <div className="error">Xin vui lòng chọn quận huyện</div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const SelectWard = () => {
    return (
      <div className={styles.item}>
        <select
          className={styles.select}
          // title="Chọn Phường Xã"
          onChange={handleWardChange}
          value={getWard}
        >
          {!getWard ? (
            <option value="0">Chọn Phường Xã</option>
          ) : (
            <>
              <option value={getWard}>{getWard}</option>
            </>
          )}

          {wards.map((ward) => (
            <option key={ward.id} value={ward.id}>
              {ward.full_name}
            </option>
          ))}
        </select>
        {error && !getWard ? (
          <div className="error">Xin vui lòng chọn phường xã</div>
        ) : (
          ""
        )}
      </div>
    );
  };

  return {
    getProvince,
    getDistrict,
    getWard,
    SelectProvince,
    SelectDistrict,
    SelectWard,
  };
};

export default Address;
