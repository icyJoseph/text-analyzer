import "./styles/header.css";
import "./styles/stats.css";

import React, { Fragment } from "react";
import { Emoji } from "./components/Emoji";
import { TextArea } from "./components/TextArea";
import { Stats, useReadingTime } from "./reader/stream";
import { useToxicity, Predictions } from "./reader/toxicity";

const RenderWithPredictions = ({
  children
}: {
  children: ({ predictions }: { predictions: Predictions }) => JSX.Element;
}) => {
  const predictions = useToxicity();
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
      <header className="header pure-u-1">
        <h1>Hello!</h1>
        <p>Type something</p>
      </header>
      <main className="pure-u-1">
        <section className="pure-u-1-5">
          <RenderWithPredictions>
            {({ predictions }) => (
              <ul>
                {predictions.map((prediction) => {
                  const { match } = prediction.results[0];
                  const emojiProps = {
                    symbol: match ? "⚠️" : "✔️",
                    title: match ? "Yes" : "No",
                    ariaLabel: match ? "Yes" : "Noe"
                  };

                  return (
                    <li key={prediction.label}>
                      <span>{prediction.label}</span>
                      <p>
                        <Emoji {...emojiProps} />
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </RenderWithPredictions>
        </section>
        <section className="pure-u-3-5">
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
    </Fragment>
  );
}

export default App;
