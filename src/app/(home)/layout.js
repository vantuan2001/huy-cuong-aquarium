import { Montserrat } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/home/navbar/Navbar";
import Footer from "@/components/home/footer/Footer";
import { StoreProvider } from "@/redux/StoreProvider";

const montserrats = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Huy Cuờng Aquarium",
  description: "Cửa hàng bể cá thuỷ sinh Huy Cường",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={montserrats.className}>
          <div className="layout">
            <Navbar />
            <div className="children">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
