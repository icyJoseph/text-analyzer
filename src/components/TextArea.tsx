import React, { useEffect, useRef, useMemo } from "react";
import { useSubscription } from "use-subscription";
import { stream } from "../reader/stream";

import "../styles/growArea.css";

const useSubscribeToTextArea = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => ref.current?.value,
      subscribe: (callback: () => void) => {
        const current = ref.current;
        current?.addEventListener("input", callback);
        return () => current?.removeEventListener("input", callback);
      }
    }),
    []
  );

  const value = useSubscription(subscription);

  return { ref, value };
};

export const TextArea = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { ref: textAreaRef, value } = useSubscribeToTextArea();

  useEffect(() => {
    if (parentRef.current) {
      const parent = parentRef.current;
      parent.dataset.replicatedValue = value;
    }
  }, [value]);

  useEffect(() => {
    if (textAreaRef.current) {
      const disconnect = stream.connect(textAreaRef.current);
      return () => disconnect();
    }
  }, []);

  return (
    <div className="grow-wrap" ref={parentRef}>
      <textarea
        ref={textAreaRef}
        placeholder="You have something to say..."
      ></textarea>
    </div>
  );
};
