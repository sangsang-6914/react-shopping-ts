import React from 'react';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  buttonStyle?: string;
  disabled?: boolean;
}

function Button({ text, onClick, buttonStyle, disabled }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyle} bg-brand p-3 text-white hover:brightness-110`}
    >
      {text}
    </button>
  );
}

export default Button;
