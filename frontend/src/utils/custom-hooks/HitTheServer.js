import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import useDidMountEffect from "../../utils/custom-hooks/DidMountEffect";
import history from "../history";
import types from "../../reducers/actionTypes";
import { UserContext } from "../contexts";

const baseUrl = "http://localhost:8000/api/";

export const Getter = endpoint => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const url = `${baseUrl}${endpoint}`;

  useEffect(() => {
    const doGet = async () => {
      setIsError(false);
      setIsLoading(true);

      let result;

      try {
        result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
        setError(error);
      }

      setIsLoading(false);
    };
    doGet();
  }, []);
  return [{ data, isLoading, isError, error }];
};

export const Setter = () => {
  const [setterData, setSetterData] = useState({});
  const [url, setUrl] = useState("");
  const [entry, setEntry] = useState("property");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(UserContext);

  useDidMountEffect(() => {
    const doSet = async () => {
      setError({ ...error, isError: false });
      setIsLoading(true);

      let result;
      let token;

      try {
        

        if (entry === "property") {
          token = JSON.parse(localStorage.getItem('token')).access
          result = await axios.post(url, setterData, {headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }});
          dispatch({ type: types.propertySuccess, payload: result.data });
          
        } else {
          result = await axios.post(url, setterData);
          dispatch({ type: types.authSuccess, user: result.data });

          localStorage.setItem("user", JSON.stringify(result.data));
          if (result.data.user) {
            localStorage.setItem(
              "token",
              JSON.stringify(result.data.user.token)
            );
          }

          history.push({
            pathname: "/dashboard/users/".concat(result.data.user.id),
            state: result.data
          });
        }

        setIsLoading(false);
      } catch (error) {
        setSubmit(false);
        setIsLoading(false);

        console.log(error.message)
        error.message === "Network Error"
        ? setError({
          ...error,
          message: error.message,
          isError: true
        })
        : setError({
          ...error,
          message: error.response.data.error,
          isError: true
        });
      }
    };
    doSet();
  }, [url, submit]);

  return [isLoading, error, setEntry, setUrl, setSetterData, setSubmit];
};
