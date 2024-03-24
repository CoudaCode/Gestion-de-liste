import React from "react";
import { Link } from "react-router-dom";
interface buttonProps {
  type?: string;
  className: string;
  text: string;
  link?: string;
}

const Button: React.FC<buttonProps> = ({ type, className, text, link }) => {
  const buttonType =
    type === "submit" || type === "reset" || type === "button"
      ? type
      : "button";
  return link ? (
    <Link to={link as string}>
      <button type={buttonType} className={className}>
        {text}
      </button>
    </Link>
  ) : (
    <button type={buttonType} className={className}>
      {text}
    </button>
  );
};

export default Button;
