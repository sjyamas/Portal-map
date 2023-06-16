import React from "react";

export default function SevenSegment({ x, y }) {
  let canvasWidth = 1000;
  let canvasHeight = 1000;
  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(0.75)">
        <rect width={canvasWidth} height={canvasHeight} />
        <circle cx={x} cy={y} r="5" fill="red" />
        <circle cx="250" cy="100" r="5" fill="red" />
        <circle cx="250" cy="500" r="5" fill="red" />
        <circle cx="250" cy="900" r="5" fill="red" />
        <circle cx="750" cy="100" r="5" fill="red" />
        <circle cx="750" cy="500" r="5" fill="red" />
        <circle cx="750" cy="900" r="5" fill="red" />
        <line x1="250" y1="0" x2="250" y2="1000" stroke="blue" />
        <line x1="750" y1="0" x2="750" y2="1000" stroke="blue" />
        <line x1="0" y1="100" x2="1000" y2="100" stroke="blue" />
        <line x1="0" y1="900" x2="1000" y2="900" stroke="blue" />
        <line x1="0" y1="500" x2="1000" y2="500" stroke="blue" />
      </g>
    </svg>
  );
}
