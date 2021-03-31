import { useMemo } from "react";
import { useSubscription } from "use-subscription";
import reader from "reading-time";

export type Stats = {
  text: string;
  minutes: number;
  time: number;
  words: number;
  characters: number;
  source: string;
};

type VoidCallback = () => void;

type ReaderStream = {
  stats: Stats;
  connect: (element: HTMLTextAreaElement) => VoidCallback;
  addEventListener: (listener: Listener) => number;
  removeEventListener: (listener: Listener) => void;
};

type Listener = (result: Stats) => void;

const createStream = (): ReaderStream => {
  const listeners: Listener[] = [];

  let stats = {
    text: "0 min read",
    minutes: 0,
    time: 0,
    words: 0,
    characters: 0,
    source: ""
  };

  const calculate = (text: string) => {
    const result = reader(text);
    const characters = text
      .split("")
      .map((x) => x.trim())
      .filter((x) => x).length;

    stats = { ...result, characters, source: text };

    listeners.forEach((listener) => listener(stats));
  };

  return {
    get stats() {
      return stats;
    },
    connect: (element: HTMLTextAreaElement) => {
      const handler = () => calculate(element.value);

      element.addEventListener("input", handler);

      return () => element.removeEventListener("input", handler);
    },

    addEventListener: (listener: Listener) => {
      return listeners.push(listener);
    },

    removeEventListener: (listener: Listener) => {
      const index = listeners.indexOf(listener);
      ~index && listeners.splice(index, 1);
      return;
    }
  };
};

export const stream = createStream();

export const useReadingTime = () => {
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => stream.stats,
      subscribe: (callback: VoidCallback) => {
        stream.addEventListener(callback);
        return () => stream.removeEventListener(callback);
      }
    }),
    []
  );

  return useSubscription(subscription);
};
