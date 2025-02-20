import "./globals.css";
import "./reset.css";
import { basicFont } from "@/assets/fonts";

export default function HTMLLayout({ children }) {
  return (
    <html lang="en" className={basicFont.className}>
      <body>{children}</body>
    </html>
  );
}
