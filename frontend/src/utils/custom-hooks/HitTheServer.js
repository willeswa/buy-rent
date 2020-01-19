import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import useDidMountEffect from "../../utils/custom-hooks/DidMountEffect";
import history from "../history";
import {postReducer} from "../../reducers/Auth";
import types from "../../reducers/actionTypes";

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
        setError(error.message);
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
  const [submit, setSubmit] = useState(false);
  const [state, dispatch] = useReducer(postReducer, {
    isError: false,
    isLoading: false,
    submit: false,
    payload: {},
    error: null
  });

  useDidMountEffect(() => {
    const doSet = async () => {
      dispatch({ type: types.loadingAction });

      try {
        const result = await axios.post(url, setterData);

        dispatch({ type: types.postSuccess, payload: result.data });

        localStorage.setItem("user", JSON.stringify(result.data));
        if (result.data.user) {
          localStorage.setItem("token", JSON.stringify(result.data.user.token));
        }

        history.push({
          pathname: "/dashboard/users/".concat(result.data.user.id),
          state: result.data
        });
      } catch (error) {
        dispatch({ type: types.postFailure, error: error.message  });
        setSubmit(false);
      }
    };
    doSet();
  }, [url, submit]);

  return [state, setUrl, setSetterData, setSubmit];
};
