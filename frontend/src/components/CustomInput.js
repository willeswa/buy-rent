import React from "react";

export const TextPasswordInput = props => (
  <div className="form-group">
    <label htmlFor={props.inputType}>{props.typeText}:</label>
    <input
      type={props.type}
      className="form-control form-control-md"
      id={props.inputType}
      aria-describedby={props.typeHelp}
      onChange={props.onchange}
      required
      placeholder={props.placeholder}
      value={props.value}
    />
  </div>
);
