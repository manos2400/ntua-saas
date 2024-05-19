import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const raleway = Raleway({subsets: ['latin'], style: ['normal', 'italic']});

export const metadata = {
  title: "SolveMyProb",
  description: "The best complex problem solver worldwide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
