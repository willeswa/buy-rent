import React, { useState } from "react";
import { Alert } from "antd";
import { TextPasswordInput } from "../CustomInput";
import { AuthSetter } from "../../utils/custom-hooks/HitTheServer";

export default () => {
  const baseUrl = "https://bungomaplus.herokuapp.com/api/auth/signup/";
  const [signupData, setSignupData] = useState({});
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
    if (type === "email") {
      setSignupData({ ...signupData, email: value });
    } else if (type === "tel") {
      setSignupData({ ...signupData, phonenumber: value });
    } else if (type === "password") {
      setSignupData({ ...signupData, password: value });
    }
  };

  return (
    <div>
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
          setSetterData(signupData);
          setSubmit(true);
        }}
      >
        <h4 className="h5 pb-3">Register for Free</h4>
        <div className="form-group form-row">
          <TextPasswordInput
            inputType="inputEmail"
            type="email"
            onchange={e => handleInputChange(e)}
            placeholder="eg. wekesa@gmail.com"
            typeText="Email"
            className="form-control"
            col="form-group col-md-6"
          />
          <TextPasswordInput
            inputType="inputTel"
            type="tel"
            onchange={e => handleInputChange(e)}
            placeholder="eg. 0721..."
            typeText="Phone Number"
            className="form-control"
            col="form-group col-md-6"
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
          {isLoading ? "Signing up.." : "Signup"}
        </button>
      </form>
    </div>
  );
};
