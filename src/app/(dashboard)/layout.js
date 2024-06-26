import { Montserrat } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Navbar from "@/components/dashboard/navbar/navbar";
import Footer from "@/components/dashboard/footer/footer";
const montserrat = Montserrat({ subsets: ["latin"] });
export const metadata = {
  title: "Admin - Huy Cường Aquarium",
  description: "Được tạo bởi Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
      </head>

      <body className={montserrat.className}>
        <div className={styles.container}>
          <div className={styles.menu}>
            <div className={styles.menuContainer}>
              <Sidebar />
            </div>
          </div>
          <div className={styles.content}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
