import Header from "@/components/Headers/Header";
import React from "react";

function RootLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default RootLayout;
