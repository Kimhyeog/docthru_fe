import React from "react";
import style from "./challengeDetail.module.css";
function ChallengeDetailLayout({ children }) {
  return <div className={style.layout}>{children}</div>;
}

export default ChallengeDetailLayout;
