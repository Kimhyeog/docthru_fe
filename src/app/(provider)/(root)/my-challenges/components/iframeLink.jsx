"use client";

import { useState } from "react";

export default function iframeLink() {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const url = "https://nestjs.com/";

  const handleMouseEnter = () => {
    setIsButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setIsButtonVisible(false);
  };

  const handleButtonClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <iframe src={url} width="890" height="424" title="원문 링크" />
      {isButtonVisible && (
        <button
          onClick={handleButtonClick}
          style={{
            position: "absolute",
            height: "32px",
            width: "96px",
            color: "rgba(64, 64, 64,)",
            fontSize: "14px",
            fontWeight: "700",
            top: "8px",
            right: "16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.56)",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          링크열기↗
        </button>
      )}
    </div>
  );
}
