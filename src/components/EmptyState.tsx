"use client";

import { Package } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  illustration?: React.ReactNode;
}

const EmptyState = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  illustration 
}: EmptyStateProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      {illustration ? (
        illustration
      ) : (
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {buttonText && buttonLink && (
        <a 
          href={buttonLink} 
          className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          {buttonText}
        </a>
      )}
    </div>
  );
};

export default EmptyState;