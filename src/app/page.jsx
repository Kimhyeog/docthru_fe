"use client";

import { FaClipboardList, FaAngleRight, FaArrowDown } from "react-icons/fa";
import Button from "./components/Button";
import style from "./page.module.css";

export default function Home() {
  return (
    <div className={style.page}>
      <Button text={"나는 버튼입니다."} onClick={() => {}} />
      <Button
        type={"black"}
        text={"나는 블랙 버튼입니다."}
        onClick={() => {}}
      />
      <Button type={"red"} text={"나는 레드 버튼입니다."} onClick={() => {}} />
      <Button
        type={"yellow"}
        text={"나는 노란 버튼입니다."}
        onClick={() => {}}
      />
      <Button type={"gray"} text={"나는 회색 버튼입니다."} onClick={() => {}} />
      <Button
        type={"outline_icon"}
        text={"outline_icon1"}
        onClick={() => {}}
        icon={<FaClipboardList />}
      />
      <Button
        type={"outline_icon"}
        text={"outline_icon2"}
        onClick={() => {}}
        icon={<FaAngleRight />}
      />
      <Button type={"page"} text={"1"} onClick={() => {}} />
      <Button
        type={"rightBig"}
        onClick={() => {}}
        icon={<FaAngleRight color="white" />}
      />
      <Button
        type={"rightSmall"}
        onClick={() => {}}
        icon={<FaAngleRight size={13} color="white" />}
      />
      <Button
        type={"bottom"}
        onClick={() => {}}
        icon={<FaArrowDown color="white" />}
      />
    </div>
  );
}
