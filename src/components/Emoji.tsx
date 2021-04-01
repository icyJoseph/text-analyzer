import "../styles/emoji.css";
import React from "react";

type EmojiProps = {
  symbol: string;
  title: string;
  ariaLabel: string;
};

export const Emoji = ({ symbol, title, ariaLabel }: EmojiProps) => (
  <span className="emoji" role="img" aria-label={ariaLabel} title={title}>
    {symbol}
  </span>
);
