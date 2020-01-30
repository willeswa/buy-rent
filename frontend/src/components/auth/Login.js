import React, { useState } from "react";
import { Alert } from "antd";
import { TextPasswordInput } from "../CustomInput";
import { AuthSetter } from "../../utils/custom-hooks/HitTheServer";

export default ({ state }) => {
  const [loginData, setLoginData] = useState({});
  const baseUrl = "https://bungomaplus.herokuapp.com/api/auth/login/";
  const [
    isLoading,
    error,
    doSet,
    setSetterData,
    setSubmit
  ] = AuthSetter();

  const handleInputChange = e => {
    let type = e.target.type;
    let value = e.target.value;
    type === "email"
      ? setLoginData({ ...loginData, email: value })
      : setLoginData({ ...loginData, password: value });
  };

  return (
    <div className="auth-container">
      {error.isError ? (
        <div className="antd-holder">
          <Alert
            message={error.message}
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
        <h4 className="h5 pb-3">{isLoading ? 'Please wait...' : 'Login to Continue...'}</h4>
        <div className="form-group">
          <TextPasswordInput
            inputType="inputEmail"
            type="email"
            onchange={e => handleInputChange(e)}
            placeholder="eg. wekesa@gmail.com"
            typeText="Email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <TextPasswordInput
            inputType="inputPassword"
            type="password"
            onchange={e => handleInputChange(e)}
            placeholder="*****"
            typeText="Password"
            className="form-control"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary btn-block"
        >
          {isLoading ? "Loging in.." : "Login"}
        </button>
      </form>
    </div>
  );
};
