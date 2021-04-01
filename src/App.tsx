import "./styles/header.css";
import "./styles/stats.css";
import "./styles/grid.css";
import "./styles/predictions.css";

import React, { Fragment } from "react";
import { Emoji } from "./components/Emoji";
import { TextArea } from "./components/TextArea";
import { Spinner } from "./components/Spinner";
import { Stats, useReadingTime } from "./reader/stream";
import { useToxicity, Predictions } from "./reader/toxicity";

const RenderWithPredictions = ({
  children
}: {
  children: ({ predictions }: { predictions: Predictions }) => JSX.Element;
}) => {
  const { predictions, loading } = useToxicity();
  if (loading) return <Spinner />;
  return children({ predictions });
};

const RenderWithReadingStats = ({
  children
}: {
  children: ({ stats }: { stats: Stats }) => JSX.Element;
}) => {
  const stats = useReadingTime();
  return children({ stats });
};

function App() {
  return (
    <Fragment>
      <header className="header pure-u-1 entry">
        <h1>Hello!</h1>
        <p>Type something</p>
      </header>
      <main className="pure-u-1 entry">
        <section className="pure-u-1 pure-u-md-3-8 pure-u-lg-1-4 grid prediction-section">
          <h2 className="sub-header">Toxicity Analysis</h2>
          <RenderWithPredictions>
            {({ predictions }) => (
              <ul className="predictions">
                {predictions
                  .slice(0)
                  .sort((a, b) => b.label.localeCompare(a.label))
                  .filter((prediction) => prediction.results[0].match)
                  .map((prediction) => (
                    <li key={prediction.label}>
                      <span>{prediction.label}</span>
                      <Emoji
                        symbol="⚠️"
                        title={prediction.label}
                        ariaLabel="Warning"
                      />
                    </li>
                  ))}
              </ul>
            )}
          </RenderWithPredictions>
        </section>

        <section className="pure-u-1 pure-u-md-5-8 pure-u-lg-3-4 grid">
          <RenderWithReadingStats>
            {({ stats }) => (
              <div className="stats-view pure-u-1">
                <span className="stats pure-u-1-3">{stats.text}</span>
                <span className="stats pure-u-1-3">
                  {stats.words} {stats.words === 1 ? "word" : "words"}
                </span>
                <span className="stats pure-u-1-3">
                  {stats.characters} characters
                </span>
              </div>
            )}
          </RenderWithReadingStats>

          <TextArea />
        </section>
      </main>

      <footer className="pure-u-1 entry"></footer>
    </Fragment>
  );
}

export default App;
