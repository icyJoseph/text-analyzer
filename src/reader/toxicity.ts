import { useEffect, useState } from "react";
import { ToxicityClassifier } from "@tensorflow-models/toxicity";
import { stream, Stats } from "./stream";
import { debounce } from "./helpers";

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

// An array of predictions
export type Predictions = Await<ReturnType<ToxicityClassifier["classify"]>>;

export const labels = [
  "identity_attack",
  "insult",
  "obscene",
  "severe_toxicity",
  "sexual_explicit",
  "threat",
  "toxicity"
] as const;

export type Labels = typeof labels[number];

export const useToxicity = () => {
  const [model, setModel] = useState<ToxicityClassifier | null>(null);
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
    import("@tensorflow/tfjs").then(() => {
      import("@tensorflow-models/toxicity").then(({ load }) => {
        load(0.5, labels.slice(0))
          .then((model) => setModel(model))
          .then(() => setLoading(false));
      });
    });
  }, []);

  // off load to a worker
  useEffect(() => {
    const handler = debounce((stats: Stats) => {
      if (model) {
        model
          .classify(stats.source)
          .then(setPredictions)
          .then(() => setLoading(false));
      }
    }, 1000);

    stream.addEventListener(handler);

    return () => {
      stream.removeEventListener(handler);
    };
  }, [model]);

  console.log(predictions);

  return { predictions, loading } as const;
};
