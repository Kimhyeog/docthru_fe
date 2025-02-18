import api from "@/api";
import React from "react";

async function ChallengePage() {
  const challenges = await api.getChalleges();
  return <div>page</div>;
}

export default ChallengePage;
