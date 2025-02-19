import "./globals.css";
import "./reset.css";

export default function HTMLLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
