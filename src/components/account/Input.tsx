"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<Props> = ({ label, className, ...rest }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm text-gray-700 mb-1">{label}</label>}
      <input
        className={`w-full h-[44px] border border-gray-200 rounded-[12px] px-3 focus:outline-none focus:ring-2 focus:ring-orange-200 ${className || ""}`}
        {...rest}
      />
    </div>
  );
};

export default Input;
