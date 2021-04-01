import { load, ToxicityClassifier } from "@tensorflow-models/toxicity";
import { Stats } from "./stream";

const labels = [
  "identity_attack",
  "insult",
  "obscene",
  "severe_toxicity",
  "sexual_explicit",
  "threat",
  "toxicity"
] as const;

let model: ToxicityClassifier;

import("@tensorflow/tfjs").then(() => {
  load(0.5, labels.slice(0)).then((result) => {
    model = result;
    // @ts-expect-error
    self.postMessage({ type: "MODEL_READY" });
  });
});

self.addEventListener("message", ({ data }: { data: Stats }) => {
  if (!model) return;
  model.classify(data.source).then((payload) => {
    // @ts-expect-error
    self.postMessage({ type: "PREDICTION_READY", payload });
  });
});
