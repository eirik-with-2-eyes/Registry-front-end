import React from 'react';

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, label }) => {
  return (
    <button 
      onClick={onClick}
      className="text-blue-500 hover:underline mb-4 flex items-center"
    >
      ← {label}
    </button>
  );
};