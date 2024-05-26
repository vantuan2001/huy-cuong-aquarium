import { auth } from "@/lib/auth";
import styles from "./checkout.module.css";
import CheckoutForm from "@/components/home/checkoutForm/checkoutForm";

export const generateMetadata = () => {
  return {
    title: "Thanh toán",
  };
};

const CheckOut = async () => {
  const session = await auth();

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Thanh toán</h2>
        </div>
        <CheckoutForm user={session.user} />
      </div>
    </div>
  );
};

export default CheckOut;
