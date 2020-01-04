import React, { useState, useEffect } from "react";
import axios from 'axios';

export default () => {
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [singupError, setSingupError] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://127.0.0.1:8000/api/auth";

  useEffect(() => {
    const singup = async () => {
      const result = await axios.post(baseUrl + "/signup/", {
        email: email,
        phonenumber: phonenumber,
        password: password
      });
      setUser(result.data);
    }
    singup();
   }, []);

  return (
    <div>
      <form className="signupForm">
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
            {loading ? "Signin up.." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};
