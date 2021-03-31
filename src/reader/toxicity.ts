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

  useEffect(() => {
    import("@tensorflow/tfjs").then(() => {
      import("@tensorflow-models/toxicity").then(({ load }) => {
        load(0.8, labels.slice(0)).then((model) => setModel(model));
      });
    });
  }, []);

  useEffect(() => {
    const handler = debounce((stats: Stats) => {
      if (model) {
        // is there a good way to stop an ongoing classification
        model.classify(stats.source).then(setPredictions);
      }
    }, 1000);

    stream.addEventListener(handler);

    model?.classify("").then(setPredictions);

    return () => {
      stream.removeEventListener(handler);
    };
  }, [model]);

  return predictions;
};
