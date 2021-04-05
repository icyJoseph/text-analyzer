import { useEffect, useState, useRef } from "react";
import { ToxicityClassifier } from "@tensorflow-models/toxicity";
import { stream, Stats } from "./stream";
import ModelWorker from "./worker?worker";
import { debounce } from "./helpers";

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

// An array of predictions
export type Predictions = Await<ReturnType<ToxicityClassifier["classify"]>>;

// type Actions =
//   | { type: "MODEL_READY" }
//   | { type: "PREDICTION_READY"; payload: Predictions };

export const useToxicity = () => {
  const [ready, setReady] = useState(false);
  const model = useRef<Worker | null>(null);
  const [predictions, setPredictions] = useState<Predictions>([]);
  const [loading, setLoading] = useState(false);

  // useSubscription instead
  useEffect(() => {
    const handler = () => setLoading(true);
    stream.addEventListener(handler);
    return () => stream.removeEventListener(handler);
  }, []);

  // off load to a worker
  useEffect(() => {
    setLoading(true);
    const worker = new ModelWorker();
    model.current = worker;

    worker.addEventListener("message", ({ data }) => {
      if (data.type === "MODEL_READY") {
        setLoading(false);
        setReady(true);
      }
      if (data.type === "PREDICTION_READY") {
        setLoading(false);
        setPredictions(data.payload);
      }
    });
  }, []);

  // off load to a worker
  useEffect(() => {
    const handler = debounce((stats: Stats) => {
      if (model.current) {
        model.current.postMessage(stats);
      }
    }, 1000);

    stream.addEventListener(handler);

    return () => {
      stream.removeEventListener(handler);
    };
  }, [model]);

  return { predictions, loading } as const;
};
