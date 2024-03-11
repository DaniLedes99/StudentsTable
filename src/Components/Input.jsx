import React from "react";

function Input({
  type = "",
  placeholder = "",
  name = "",
  value = {},
  onChange = {},
  className = "",
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
    </div>
  );
}

export default Input;
