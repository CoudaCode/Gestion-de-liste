import React from "react";

interface buttonProps {
  type?: string;
  className: string;
  text: string;
}

const Button: React.FC<buttonProps> = ({ type, className, text }) => {
  return (
    <button type={type} className={className}>
      {text}
    </button>
  );
};

export default Button;
