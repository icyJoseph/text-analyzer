import React, { useEffect, useRef } from "react";
import { stream } from "../reader/stream";

import "../styles/growArea.css";

export const TextArea = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current && textAreaRef.current) {
      const parent = parentRef.current;
      const textArea = textAreaRef.current;

      const handler = () => {
        parent.dataset.replicatedValue = textArea.value;
      };

      textArea.addEventListener("input", handler);

      return () => textArea.removeEventListener("input", handler);
    }
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      const disconnect = stream.connect(textAreaRef.current);
      return () => disconnect();
    }
  }, []);

  return (
    <div className="grow-wrap" ref={parentRef}>
      <textarea ref={textAreaRef} placeholder="Text to measure..."></textarea>
    </div>
  );
};
