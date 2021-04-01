import React from "react";
import { Emoji } from "../components/Emoji";
import { Spinner } from "../components/Spinner";
import { head } from "../reader/helpers";
import { useToxicity, Predictions } from "../reader/toxicity";

type PredictionProps = { predictions: Predictions };

type ChildrenProps = (props: PredictionProps) => JSX.Element;

type RenderProps = { children: ChildrenProps };

const RenderWithPredictions = ({ children }: RenderProps) => {
  const { predictions, loading } = useToxicity();

  if (loading) return <Spinner />;

  return children({ predictions });
};

const PredictionsItem = ({
  label
}: {
  label: Predictions[number]["label"];
}) => (
  <li key={label}>
    <span>{label}</span>
    <Emoji symbol="⚠️" title={label} ariaLabel="Warning" />
  </li>
);

const PredictionsList = ({ predictions }: PredictionProps) => (
  <ul className="predictions">
    {predictions
      .slice(0)
      .sort((a, b) => b.label.localeCompare(a.label))
      .filter(({ results }) => head(results).match)
      .map(({ label }) => (
        <PredictionsItem key={label} label={label} />
      ))}
  </ul>
);

export const Analysis = () => (
  <section className="pure-u-1 pure-u-md-3-8 pure-u-lg-1-4 grid prediction-section">
    <h2 className="sub-header">Toxicity Analysis</h2>

    <RenderWithPredictions>
      {({ predictions }) => <PredictionsList predictions={predictions} />}
    </RenderWithPredictions>
  </section>
);
