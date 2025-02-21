import Header from "@/components/Headers/Header";
import React from "react";
import { basicFont } from "@/assets/fonts";
import style from "./RootLayout.module.css";

function RootLayout({ children }) {
  return (
    <div
      style={{ fontFamily: basicFont.style.fontFamily }}
      className={style.layout}
    >
      <Header />
      {children}
    </div>
  );
}

export default RootLayout;
