"use client";
import React from "react";

interface Props {
  onClick: () => void;
  size?: string;
}
const CancelButton = ({ onClick, size }: Props) => {
  return (
    <button
      onClick={() => onClick()}
      className={`btn btn-circle btn-outline btn-error ml-1 ${
        size ? size : ""
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default CancelButton;
