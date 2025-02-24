"use client";

import { useEffect, useRef, useState } from "react";
import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

function Page() {
  const textareaRef = useRef(null);
  const [content, setContent] = useState(""); // 에디터 내용 상태 관리

  useEffect(() => {
    if (textareaRef.current) {
      const simplemde = new SimpleMDE({
        element: textareaRef.current,
        // SimpleMDE 옵션 (예: 도구 모음 버튼 설정)
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
          "image",
          "|",
          "preview",
        ],
      });

      simplemde.value(content); // 초기 내용 설정

      simplemde.codemirror.on("change", () => {
        // 내용 변경 시 상태 업데이트
        setContent(simplemde.value());
      });

      return () => {
        simplemde.toTextArea().value = "";
        simplemde = null;
      };
    }
  }, []);

  const handleSave = () => {
    // 저장 로직 (예: 서버에 내용 전송)
    console.log("저장:", content);
  };

  return (
    <div>
      <textarea id="MyID" ref={textareaRef}></textarea>
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default Page;
