"use client";

import { useEffect, useRef, useState } from "react";
import SimpleMDE from "simplemde";
import Split from "split.js";
import "simplemde/dist/simplemde.min.css";

function Page() {
  const textareaRef = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      const simplemde = new SimpleMDE({
        element: textareaRef.current,

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

      simplemde.value(content);

      simplemde.codemirror.on("change", () => {
        setContent(simplemde.value());
      });

      return () => {
        simplemde.toTextArea().value = "";
        simplemde = null;
      };
    }
  }, []);

  const handleSave = () => {
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
