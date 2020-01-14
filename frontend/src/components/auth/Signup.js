import React, { useState } from "react";
import { Alert } from "antd";
import useDidMountEffect from "../../utils/custom-hooks/DidMountEffect";
import axios from "axios";
import history from "../../utils/history";

export default () => {
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [singupError, setSingupError] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://127.0.0.1:8000/api/auth";
  

  

  useDidMountEffect(() => {
    const signup = async () => {
      setLoading(true);
      setIsError(false);
      try {
        const result = await axios.post(baseUrl + "/signup/", {
          email: email,
          phonenumber: phonenumber,
          password: password
        });

        setUser(result.data)
        localStorage.setItem("user", JSON.stringify(result.data));
        
        setLoading(false);
        history.push({pathname: '/login', state: result.data})

      } catch (error) {
        setIsError(true);
        setSubmit(false);
        if (error.message === "Network Error") {
          setSingupError("You seem to be offline!");
        } else {
          if (error.response.status === 400) {
            setSingupError(
              "Email or phonenumber is registered!"
            );
          } else {
            setSingupError("Oops! Something went wrong...");
          }
        }

        setLoading(false);
      }
    };
    signup();
  }, [submit]);

  

  return (
    <div>
      {isError ? (
       <div className="antd-holder"> <Alert
       message={singupError}
       className="antd-alert"
       closable
       type="error"
       closeText="Dismiss!"
     /></div>
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
        <h4 className="h5 pb-3">Register for Free</h4>
        <div className="form-row">
          <div className="form-group col-md-6">
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
          <div className="form-group col-md-6">
            <label htmlFor="inputPhone">Phone Number: </label>

            <input
              type="tel"
              className="form-control form-control-md"
              id="inputPhone"
              aria-describedby="telHelp"
              onChange={e => setPhonenumber(e.target.value)}
              required
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="07 ..."
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
            {loading ? "Signing up.." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};
