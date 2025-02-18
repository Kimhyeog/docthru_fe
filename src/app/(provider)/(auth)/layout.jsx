import React from "react";
import style from "./layout.module.css";
function AuthLayout({ children }) {
  return <div className={style.layout}>{children}</div>;
}

export default AuthLayout;
