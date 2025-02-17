"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { logOut, isLoggedIn } = useAuth();
  return <button onClick={logOut}>로그아웃</button>;
}
