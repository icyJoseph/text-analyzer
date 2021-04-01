import React from "react";
import { TextArea } from "../components/TextArea";
import { Stats, useReadingTime } from "../reader/stream";

type StatsProps = { stats: Stats };

type ChildrenProps = (props: StatsProps) => JSX.Element;

type RenderProps = { children: ChildrenProps };

const RenderWithReadingStats = ({ children }: RenderProps) => {
  const stats = useReadingTime();
  return children({ stats });
};

const StatsView = ({ text, words, characters }: Stats) => (
  <div className="stats-view pure-u-1">
    <span className="stats pure-u-1-3">{text}</span>
    <span className="stats pure-u-1-3">
      {words} {words === 1 ? "word" : "words"}
    </span>
    <span className="stats pure-u-1-3">{characters} characters</span>
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
