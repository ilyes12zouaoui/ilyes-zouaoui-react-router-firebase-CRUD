import React, { Component } from "react";

const InpurErrorMessage = ({ errors, inputName }) => {
  let result = null;
  if (errors && errors[inputName]) {
    result = <span style={{ color: "red" }}>{errors[inputName]}</span>;
  }
  return result;

  //     return (
  //     errors &&
  //     (errors[inputName] || null) && (
  //       <span style={{ color: "red" }}>{errors[inputName]}</span>
  //     )
  //   );
};

export default InpurErrorMessage;
