"use client";

import Siriwave from "react-siriwave";

export function Wave({
  disabled,
  height = 620,
}: {
  disabled?: boolean;
  height?: number;
}) {

  return (
    <Siriwave
      theme="ios9"
      // width={800}
      height={(height === 620) ? 320 : height}
      amplitude={disabled ? 0.1 : 2}
      speed={disabled ? 0.05 : 0.08}
      cover
      lerpSpeed={1}
    />
  );
}
