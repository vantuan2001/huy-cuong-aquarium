import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json([
    {
      "province": "Hà Nội",
      "districts": [
        {
          "name": "Ba Đình",
          "wards": [
            "Cống Vị",
            "Điện Biên",
            "Đội Cấn",
           
          ]
        },
        {
          "name": "Hoàn Kiếm",
          "wards": [
            "Chương Dương",
            "Cửa Đông",
           
          ]
        },
       
      ]
    },
    {
      "province": "TP Hồ Chí Minh",
      "districts": [
        {
          "name": "Quận 1",
          "wards": [
            "Bến Nghé",
            "Bến Thành",
           
          ]
        },
       
      ]
    },
   
  ])
}
