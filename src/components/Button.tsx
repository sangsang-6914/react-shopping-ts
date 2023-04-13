import React from 'react';

interface IButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-brand p-3 text-white hover:brightness-110"
    >
      {text}
    </button>
  );
}

export default Button;
