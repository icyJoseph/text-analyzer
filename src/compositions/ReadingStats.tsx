import React, { Fragment } from "react";
import { TextArea } from "../components/TextArea";
import { head } from "../reader/helpers";
import { Stats, useReadingTime } from "../reader/stream";

type StatsProps = { stats: Stats };

type ChildrenProps = (props: StatsProps) => JSX.Element;

type RenderProps = { children: ChildrenProps };

const RenderWithReadingStats = ({ children }: RenderProps) => {
  const stats = useReadingTime();
  return children({ stats });
};

const Split = ({ text }: { text: string }) => {
  const words = text.trim().split(" ");

  return (
    <Fragment>
      <span className="first-word">{head(words)}</span>
      <span className="rest-of-sentence">{words.slice(1).join(" ")}</span>
    </Fragment>
  );
};

const StatsView = ({ text, words, characters }: Stats) => (
  <div className="stats-view pure-u-1">
    <span className="stats pure-u-1-3">
      <Split text={text} />
    </span>
    <span className="stats pure-u-1-3">
      <Split text={`${words} ${words === 1 ? "word" : "words"}`} />
    </span>
    <span className="stats pure-u-1-3">
      <Split text={`${characters} characters`} />
    </span>
  </div>
);

export const ReadingStats = () => (
  <section className="pure-u-1 pure-u-md-5-8 pure-u-lg-3-4 grid">
    <RenderWithReadingStats>
      {({ stats }) => <StatsView {...stats} />}
    </RenderWithReadingStats>

    <TextArea />
  </section>
);
