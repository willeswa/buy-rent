import React, { useState } from "react";
import { Alert } from "antd";
import {useLocation} from 'react-router-dom';

export default () => {
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [singupError, setSingupError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const baseUrl = "http://127.0.0.1:8000/api/auth";

  
  
  return (
    <div>
      {isError ? (
        <Alert
          message={singupError}
          className="antd-alert"
          closable
          type="error"
          closeText="Dismiss!"
        />
      ) : (
        <div className="display-none"></div>
      )}
      <form
        className="signupForm"
        onSubmit={event => {
          event.preventDefault();
          setSubmit(true);
        }}
      >
        <h4 className="h5 pb-3">{location.state ? <span>Welcome to Bungoma!<br></br> Login to continue...</span> : <span>Login to continue...</span>}</h4>
        <div>
          <div className="form-group">
            <label htmlFor="inputEmail1">Email:</label>
            <input
              type="email"
              className="form-control form-control-md"
              id="inputEmail1"
              aria-describedby="emailHelp"
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="wekesa@gmail.com"
            />
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control form-control-md"
              id="inputPassword"
              onChange={e => setPassword(e.target.value)}
              required
              minLength="8"
              placeholder="*******"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block"
          >
            {loading ? "Signin up.." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};
