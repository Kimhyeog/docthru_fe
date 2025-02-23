import React from "react";
import style from "./work.module.css";

function workDetailPage({ children }) {
  return <div className={style.layout}>{children}</div>;
}

export default workDetailPage;
