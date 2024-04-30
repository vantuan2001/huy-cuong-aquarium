import Image from "next/image";
import styles from "./about.module.css";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>HUY CƯỜNG AQUARIUM</h2>
      <p>
        Nếu bạn đam mê nghệ thuật thiên nhiên và muốn tạo ra một mảng xanh tươi
        mới trong không gian sống của mình, thì Cửa hàng Cá Cảnh Thuỷ Sinh Huy
        Cường chính là điểm đến lý tưởng. Với hơn một thập kỷ kinh nghiệm trong
        ngành, chúng tôi tự hào là điểm đến hàng đầu cho những người yêu thích
        thú vị của thế giới dưới nước.
      </p>
      <br />
      <b>Về Chúng Tôi:</b>
      <p>
        Tại Huy Cường, chúng tôi không chỉ cung cấp các loại cá, thủy sinh, và
        thiết bị cần thiết, mà còn mang đến cho khách hàng trải nghiệm mua sắm
        thú vị và chuyên nghiệp nhất. Với đội ngũ nhân viên giàu kinh nghiệm và
        đam mê, chúng tôi cam kết luôn sẵn sàng hỗ trợ bạn trong việc lựa chọn
        và chăm sóc cá cảnh, từ các loại cá, thực phẩm, đến cách bố trí và duy
        trì hệ sinh thái.
      </p>
      <br />
      <b>Dịch Vụ Của Chúng Tôi:</b>
      <ul>
        <li>
          <b>Cung Cấp Các Loại Cá và Thủy Sinh Đa Dạng:</b>
          Chúng tôi có một đội ngũ chuyên gia giàu kinh nghiệm trong việc chăm
          sóc và nuôi dưỡng các loại cá cảnh phong phú và đa dạng nhất. Từ cá
          cảnh nước ngọt cho tới cá biển và cả các loại sinh vật nhỏ như tôm,
          ốc, chúng tôi sẽ đáp ứng mọi nhu cầu của bạn.
        </li>
        <li>
          <b>Tư Vấn Chuyên Nghiệp:</b>
          Bạn sẽ không bao giờ cảm thấy lạc lõng trong việc chăm sóc cá cảnh nữa
          với sự hỗ trợ của đội ngũ chuyên gia tận tâm của chúng tôi. Chúng tôi
          sẵn lòng chia sẻ kiến thức và kinh nghiệm để giúp bạn tạo ra một hệ
          sinh thái thuỷ sinh thịnh vượng và cân bằng.
        </li>
        <li>
          <b>Thiết Bị và Phụ Kiện Chất Lượng:</b>
          Tại Huy Cường, chúng tôi không chỉ cung cấp các loại cá và thủy sinh,
          mà còn cung cấp các thiết bị và phụ kiện chất lượng cao như bơi lọc,
          đèn LED, đất nền, và nhiều hơn nữa, giúp bạn xây dựng một hệ thống cá
          cảnh hoàn hảo.
        </li>
      </ul>
      <div className={styles.images}>
        <Image src="/IMG_8354.JPG" alt="" width={500} height={400} />
        <Image src="/IMG_8355.JPG" alt="" width={500} height={400} />
      </div>

      <br />
      <b>Đặt hàng và Liên Hệ:</b>
      <p>
        Hãy ghé thăm cửa hàng của chúng tôi để khám phá thế giới tươi mới dưới
        lòng nước và để chúng tôi cùng bạn tạo ra một không gian sống xanh tươi
        và tươi mới. Đừng ngần ngại liên hệ với chúng tôi để biết thêm thông tin
        hoặc đặt hàng ngay hôm nay!
      </p>
      <br />
      <div className={styles.contact}>
        <span>
          <b>Địa chỉ:</b>
          <p>238 Đ. Việt Bắc, Quang Trung, Tp Thái Nguyên</p>
        </span>
        <span>
          <b>Số điện thoại:</b>
          <p>0974622908</p>
        </span>
        <span>
          <b>Email:</b>
          <p>Huycuongaquarium@gmail.com</p>
        </span>
      </div>
    </div>
  );
};

export default AboutPage;
