"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./address.module.css";

const Address = (error) => {
  // Khai báo các state để lưu trữ danh sách tỉnh/thành phố, quận/huyện và phường/xã được fetch từ API
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Khai báo các state để lưu trữ giá trị được chọn của tỉnh/thành phố, quận/huyện và phường/xã
  const [getProvince, setGetProvince] = useState("");
  const [getDistrict, setGetDistrict] = useState("");
  const [getWard, setGetWard] = useState("");
  // useEffect được sử dụng để fetch danh sách tỉnh/thành phố từ API khi component được render
  useEffect(() => {
    // Lấy danh sách tỉnh/thành phố
    const fetchProvinces = async () => {
      try {
        // Gửi request GET đến API để lấy danh sách tỉnh/thành phố
        const response = await axios.get(
          "https://esgoo.net/api-tinhthanh/1/0.htm"
        );
        // Cập nhật state provinces với dữ liệu được trả về từ API
        setProvinces(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error);
      }
    };
    // Gọi hàm fetchProvinces khi component được render
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    if (provinceId === "0") {
      setDistricts([]);
      setWards([]);
      return;
    }

    // Lấy thông tin tỉnh/thành phố đã chọn từ danh sách provinces
    const province = provinces.find((province) => province.id === provinceId);
    if (!province) {
      console.error("Không tìm thấy tỉnh/thành phố.");
      return;
    }

    // Lưu trữ thông tin tỉnh/thành phố đã chọn vào state
    setGetProvince(province.full_name);

    // Lấy danh sách quận/huyện từ API dựa trên provinceId đã chọn
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
      );
      setDistricts(response.data.data);
      setWards([]);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách quận/huyện:", error);
    }
  };

  // Hàm xử lý sự kiện khi chọn quận/huyện
  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    if (districtId === "0") {
      setWards([]);
      return;
    }
    // Lấy thông tin quận/huyện đã chọn từ danh sách districts
    const district = districts.find((district) => district.id === districtId);
    if (!district) {
      console.error("Không tìm thấy quận/huyện.");
      return;
    }
    // Lưu trữ thông tin quận/huyện đã chọn vào state
    setGetDistrict(district.full_name);
    // Lấy danh sách xã/phường từ API dựa trên districtId đã chọn
    try {
      const response = await axios.get(
        `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
      );
      // Cập nhật state wards với dữ liệu được trả về từ API
      setWards(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách xã/phường:", error);
    }
  };

  // Hàm xử lý sự kiện khi chọn xã/phường
  const handleWardChange = (e) => {
    const wardId = e.target.value;
    // Lấy thông tin xã/phường đã chọn từ danh sách wards
    const ward = wards.find((ward) => ward.id === wardId);
    if (!ward) {
      console.error("Không tìm thấy xã/phường.");
      return;
    }

    // Lưu trữ thông tin xã/phường đã chọn vào state
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
