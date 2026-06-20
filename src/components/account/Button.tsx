"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  full?: boolean;
};

export const Button: React.FC<Props> = ({ variant = "primary", full, className, children, ...rest }) => {
  const base = "h-11 rounded-[12px] px-4 font-medium flex items-center justify-center";
  if (variant === "primary") {
    return (
      <button
        {...rest}
        className={`${base} ${full ? "w-full" : ""} ${className || ""}`}
        style={{ background: "linear-gradient(90deg,#FF6A00,#FF8E53)", color: "white" }}
      >
        {children}
      </button>
    );
  }

  return (
    <button {...rest} className={`${base} ${full ? "w-full" : ""} border border-orange-400 text-orange-600 ${className || ""}`}>
      {children}
    </button>
  );
};

export default Button;
