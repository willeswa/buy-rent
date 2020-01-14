import React, { useState } from "react";
import { Alert } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useDidMountEffect from "../../utils/custom-hooks/DidMountEffect";
import history from "../../utils/history";


export default () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [singupError, setSingupError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const baseUrl = "http://127.0.0.1:8000/api/auth";
  
  

  useDidMountEffect(() => {
    const login = async () => {
      setLoading(true);
      setIsError(false);

      try {
        const result = await axios.post(baseUrl + "/login/", {
          email: email,
          password: password
        });

        setUser(result.data);

        localStorage.setItem("user", JSON.stringify(result.data));
        localStorage.setItem("token", JSON.stringify(result.data.user.token));
        console.log(result.data.user.token.access);
        setLoading(false);

        history.push({pathname: '/dashboard/users/'.concat(result.data.user.id), state: result.data})

      } catch (error) {
        setIsError(true);
        setSubmit(false);
        if (error.message === "Network Error") {
          setSingupError("You seem to be offline!");
        } else {
          if (error.response.status === 401) {
            setSingupError("Wrong password or email!");
          } else {
            setSingupError("Oops! Something went wrong...");
          }
        }

        setLoading(false);
      }
    };
    login();
  }, [submit]);

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
        <h4 className="h5 pb-3">
          {location.state ? (
            <span>
              Welcome to Bungoma!<br></br> Login to continue...
            </span>
          ) : (
            <span>Login to continue...</span>
          )}
        </h4>
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
