import React from "react";

export const TextPasswordInput = props => (
  <div className={props.col}>
    <label htmlFor={props.inputType}>{props.typeText}:</label>
    <input
      type={props.type}
      className={props.className}
      id={props.inputType}
      aria-describedby={props.typeHelp}
      onChange={props.onchange}
      required
      placeholder={props.placeholder}
      value={props.value}
    />
  </div>
);

