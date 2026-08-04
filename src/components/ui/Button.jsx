import React from "react";

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
  bg-primary text-white font-sans font-bold 
  py-3 px-8 rounded-full shadow-lg
  hover:bg-primary-dark hover:shadow-xl hover:-translate-y-0.5
  transition-all duration-300 ease-out
  ${className}
`}
    >
      {children}
    </button>
  );
}

export default Button;
