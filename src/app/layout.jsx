import "./globals.css";
import "./reset.css";
import { basicFont } from "@/assets/fonts";

export default function HTMLLayout({ children }) {
  return (
    <html lang="ko" style={{ fontFamily: basicFont.style.fontFamily }}>
      <body>{children}</body>
    </html>
  );
}
