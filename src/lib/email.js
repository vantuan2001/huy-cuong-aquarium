import emailjs from "@emailjs/browser";
import moment from "moment";
const YOUR_SERVICE_ID = "service_a0uwnv6";
const YOUR_TEMPLATE_ID = "template_ksomju7";
const YOUR_PUBLIC_KEY = "M4Aev_KqPQXpxj4Sl";

export const sendEmail = () => {
  const date = moment(Date.now()).format("h:mm DD-MM-YYYY");
  emailjs
    .send(
      YOUR_SERVICE_ID,
      YOUR_TEMPLATE_ID,
      {
        to_name: "Văn Tuấn",
        message: `Chúng tôi xin thông báo rằng có một đơn đặt hàng mới đã được nhận từ website của cửa hàng vào lúc ${date} hôm nay.`,
      },
      {
        publicKey: YOUR_PUBLIC_KEY,
      }
    )
    .then(
      () => {
        console.log("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error.text);
      }
    );
};
