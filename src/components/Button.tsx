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
      className={`${buttonStyle} bg-brand py-2 px-4 text-white rounded-sm hover:brightness-110`}
    >
      {text}
    </button>
  );
}

export default Button;
