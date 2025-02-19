"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import style from "./Create.module.css";
import Link from "next/link";
import CreateChallengeForm from "./_components/CreateChallengeForm";

function CreateChallengePage() {
  return (
    <div>
      <CreateChallengeForm />
    </div>
  );
}

export default CreateChallengePage;
