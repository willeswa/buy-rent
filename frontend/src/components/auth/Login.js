import React, { useState } from "react";
import { Alert } from "antd";
import { TextPasswordInput } from "../CustomInput";
import { Setter } from "../../utils/custom-hooks/HitTheServer";

export default () => {
  const [loginData, setLoginData] = useState({});
  const baseUrl = "http://127.0.0.1:8000/api/auth/login/";
  const [state, doSet, setSetterData, setSubmit] = Setter(baseUrl);

  const handleInputChange = e => {
    let type = e.target.type;
    let value = e.target.value;
    type === "email"
      ? setLoginData({ ...loginData, email: value })
      : setLoginData({ ...loginData, password: value });
  };

  console.log(state)

  return (
    <div>
      {state.isError ? (
        <div className="antd-holder">
          <Alert
            message={state.error}
            className="antd-alert"
            closable
            type="error"
            closeText="Dismiss!"
          />
        </div>
      ) : (
        <div className="display-none"></div>
      )}
      <form
        className="signupForm"
        onSubmit={event => {
          event.preventDefault();
          doSet(`${baseUrl}`);
          setSetterData(loginData);
          setSubmit(true);
        }}
      >
        <h4 className="h5 pb-3">Login to Continue...</h4>
        <div>
          <TextPasswordInput
            inputType="inputEmail"
            type="email"
            onchange={e => handleInputChange(e)}
            placeholder="eg. wekesa@gmail.com"
            typeText="Email"
          />
        </div>
        <div>
          <TextPasswordInput
            inputType="inputPassword"
            type="password"
            onchange={e => handleInputChange(e)}
            placeholder="*****"
            typeText="Password"
          />

          <button
            type="submit"
            disabled={state.isLoading}
            className="btn btn-primary btn-block"
          >
            {state.isLoading ? "Signin up.." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};
