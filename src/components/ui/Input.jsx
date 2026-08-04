import React from 'react';


const Input = ({ type = 'text', name, value, onChange, placeholder, required, className = "" }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full bg-background border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none ${className}`}
    />
  )
}

export default Input