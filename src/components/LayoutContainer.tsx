"use client";

import React from "react";

interface LayoutContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={` w-full sm:max-w-[90%] mx-auto sm:px-0 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export default LayoutContainer;
