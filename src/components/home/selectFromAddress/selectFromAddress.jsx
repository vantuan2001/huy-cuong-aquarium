"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const fetchWardsByDistrictId = async (districtId) => {
  const url =
    "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
  const token = "637170d5-942b-11ea-9821-0281a26fb5d4";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ district_id: districtId }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wards");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching wards:", error);
    return null;
  }
};

// Sử dụng hàm fetchWardsByDistrictId với district_id cụ thể
const districtId = 1566;
fetchWardsByDistrictId(districtId)
  .then((data) => {
    console.log("Wards:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const SelectAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/p");

        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const selectedProvince = provinces.find(
      (province) => province.name === e.target.value
    );
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/?province_code=${selectedProvince.code}`
      );

      const data = await response.json();
      setDistricts(data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = districts.find(
      (district) => district.name === e.target.value
    );
    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/w/?district_code=${selectedDistrict.code}`
      );

      const data = await response.json();
      setWards(data);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };
  return (
    <div>
      <select onChange={handleProvinceChange}>
        <option disabled selected>
          --Chọn Tỉnh/ Thành phố--
        </option>
        {provinces.map((province) => (
          <option key={province.code} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>

      <select onChange={handleDistrictChange}>
        <option disabled selected>
          --Chọn Quận/ Huyện--
        </option>
        {districts.map((district) => (
          <option key={district.code} value={district.name}>
            {district.name}
          </option>
        ))}
      </select>

      <select>
        <option disabled selected>
          --Chọn Phường/ Xã--
        </option>
        {wards.map((ward) => (
          <option key={ward.code} value={ward.name}>
            {ward.name}
          </option>
        ))}
      </select>
    </div>
  );

  // const [provinces, setProvinces] = useState([]);
  // const [selectedProvince, setSelectedProvince] = useState("");
  // const [districts, setDistricts] = useState([]);
  // const [selectedDistrict, setSelectedDistrict] = useState("");
  // const [wards, setWards] = useState([]);
  // const [selectedWards, setSelectedWards] = useState("");
  // const [getprovinces, setGetProvinces] = useState("");
  // const [getDistricts, setGetDistricts] = useState("");
  // const [getWards, setGetWards] = useState("");

  // useEffect(() => {
  //   // Gọi API để lấy danh sách các tỉnh thành
  //   axios
  //     .get("https://provinces.open-api.vn/api/p")
  //     .then((response) => {
  //       setProvinces(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi tìm nạp tỉnh:", error);
  //     });

  //   // get tinh
  //   axios
  //     .get(`https://provinces.open-api.vn/api/p/${selectedProvince}`)
  //     .then((response) => {
  //       setGetProvinces(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi tìm nạp tỉnh:", error);
  //     });

  //   // get huyen
  //   axios
  //     .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}`)
  //     .then((response) => {
  //       setGetDistricts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi tìm nạp quận:", error);
  //     });

  //   // get xa
  //   axios
  //     .get(`https://provinces.open-api.vn/api/w/${selectedWards}`)
  //     .then((response) => {
  //       setGetWards(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi khi tìm nạp tỉnh:", error);
  //     });

  //   if (selectedProvince !== "") {
  //     // Gọi API để lấy danh sách các quận huyện của tỉnh đã chọn
  //     axios
  //       .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
  //       .then((response) => {
  //         setDistricts(response.data.districts);
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi khi tìm nạp quận:", error);
  //       });
  //   }

  //   if (selectedDistrict !== "") {
  //     // Gọi API để lấy danh sách các xã phường của quận huyện đã chọn
  //     axios
  //       .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
  //       .then((response) => {
  //         setWards(response.data.wards);
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi khi tìm nạp phường:", error);
  //       });
  //   }
  // }, [selectedProvince, selectedDistrict, selectedWards]);

  // const handleProvinceChange = (event) => {
  //   setSelectedProvince(event.target.value);
  //   setSelectedDistrict("");
  // };

  // const handleDistrictChange = (event) => {
  //   setSelectedDistrict(event.target.value);
  //   setSelectedWards("");
  // };

  // const SelectFromAddress = () => {
  //   return (
  //     <>
  //       <div className="col-md-12 checkout-item">
  //         <select
  //           value={selectedProvince}
  //           onChange={handleProvinceChange}
  //           className="form-control"
  //         >
  //           <option value="">Tỉnh/Thành</option>
  //           {provinces.map((province) => (
  //             <option key={province.code} value={province.code}>
  //               {province.name}
  //             </option>
  //           ))}
  //         </select>
  //         {/* {err && !selectedProvince ? (
  //           <div style={{ color: "#dd4b39", fontSize: "12px" }}>
  //             Xin vui lòng chọn tỉnh thành
  //           </div>
  //         ) : (
  //           ""
  //         )} */}
  //       </div>
  //       <div className="col-md-12 checkout-item">
  //         <select
  //           value={selectedDistrict}
  //           onChange={handleDistrictChange}
  //           className="form-control"
  //         >
  //           <option value="">Chọn Quận/Huyện</option>
  //           {districts.map((district) => (
  //             <option key={district.code} value={district.code}>
  //               {district.name}
  //             </option>
  //           ))}
  //         </select>
  //         {/* {err && !selectedDistrict ? (
  //           <div style={{ color: "#dd4b39", fontSize: "12px" }}>
  //             Xin vui lòng chọn quận huyện
  //           </div>
  //         ) : (
  //           ""
  //         )} */}
  //       </div>
  //       <div className="col-md-12 checkout-item">
  //         <select
  //           className="form-control"
  //           value={selectedWards}
  //           onChange={(e) => setSelectedWards(e.target.value)}
  //         >
  //           <option value="">Chọn Phường/Xã</option>
  //           {wards.map((ward) => (
  //             <option key={ward.code} value={ward.code}>
  //               {ward.name}
  //             </option>
  //           ))}
  //         </select>
  //         {/* {err && !selectedWards ? (
  //           <div style={{ color: "#dd4b39", fontSize: "12px" }}>
  //             Xin vui lòng chọn phường xã
  //           </div>
  //         ) : (
  //           ""
  //         )} */}
  //       </div>
  //     </>
  //   );
  // };

  // return { getprovinces, getDistricts, getWards, SelectFromAddress };
};

export default SelectAddress;
