import React from "react";
import style from "./layout.module.css";
import { basicFont } from "@/assets/fonts";
function AuthLayout({ children }) {
  return (
    <div
      className={style.layout}
      style={{ fontFamily: basicFont.style.fontFamily }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;
