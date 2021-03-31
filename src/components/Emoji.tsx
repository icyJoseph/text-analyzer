import "../styles/emoji.css";
import React from "react";

type EmojiProps = {
  className?: string;
  symbol: string;
  title: string;
  ariaLabel: string;
};

export const Emoji = ({
  className = "",
  symbol,
  title,
  ariaLabel
}: EmojiProps) => (
  <span className={className} role="img" aria-label={ariaLabel} title={title}>
    {symbol}
  </span>
);
