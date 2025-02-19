"use client";
import React from "react";
import { TanstackQueryProvider } from "../../lib/tanstack-query";
import AuthProvider from "@/contexts/AuthContext";

function Providerlayout({ children }) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanstackQueryProvider>
  );
}

export default Providerlayout;
