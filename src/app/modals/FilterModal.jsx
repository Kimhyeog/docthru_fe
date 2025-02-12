import style from "./FilterModal.module.css";
import React, { useState } from "react";
import Check from "@/components/Input/Check"; // Check 컴포넌트 import
import Button from "../components/Button";

const fieldOptions = [
  { value: "Next.js", text: "Next.js" },
  { value: "Modern JS", text: "Modern JS" },
  { value: "API", text: "API" },
  { value: "Web", text: "Web" },
  { value: "Career", text: "Career" },
];

const documentTypeOptions = [
  { value: "official", text: "공식문서" },
  { value: "blog", text: "블로그" },
];

const statusOptions = [
  { value: "progress", text: "진행중" },
  { value: "completed", text: "마감" },
];

export default function FilterModal() {
  const [selectedFields, setSelectedFields] = useState([]);
  const [documentType, setDocumentType] = useState("");
  const [status, setStatus] = useState("");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedFields((prev) =>
      checked ? [...prev, value] : prev.filter((field) => field !== value)
    );
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setDocumentType(value);
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setStatus(value);
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3>필터</h3>
        <button>X</button>
      </div>

      {/* 분야 체크박스 그룹 */}
      <div className={style.section1}>
        <h4>분야</h4>
        <div className={style.TechStack}>
          {fieldOptions.map((option) => (
            <Check
              key={option.value}
              type="checkbox"
              name="field"
              value={option.value}
              text={option.text}
              checked={selectedFields.includes(option.value)}
              onChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>

      {/* 문서 타입 라디오 버튼 그룹 */}
      <div className={style.section2}>
        <h4>문서 타입</h4>
        <div className={style.docType}>
          {documentTypeOptions.map((option) => (
            <Check
              key={option.value}
              type="radio"
              name="documentType"
              value={option.value}
              text={option.text}
              checked={documentType === option.value}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      </div>

      {/* 상태 라디오 버튼 그룹 */}
      <div className={style.section3}>
        <h4>상태</h4>
        <div className={style.progressState}>
          {statusOptions.map((option) => (
            <Check
              key={option.value}
              type="radio"
              name="status"
              value={option.value}
              text={option.text}
              checked={status === option.value}
              onChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
      <div className={style.btnSection}>
        <Button text={"초기화"} onClick={() => {}} />
        <Button type={"black"} text={"적용하기"} onClick={() => {}} />
      </div>
    </div>
  );
}
