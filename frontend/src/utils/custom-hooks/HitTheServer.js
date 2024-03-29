import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import useDidMountEffect from "../../utils/custom-hooks/DidMountEffect";
import history from "../history";
import types from "../../reducers/actionTypes";
import { UserContext } from "../contexts";
import { message } from "antd";
import { async } from "regenerator-runtime";

const baseUrl = "https://bungomaplus.herokuapp.com/api/";

export const Getter = (endpoint, headers) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({ isError: false, message: "" });
  const url = `${baseUrl}${endpoint}`;
  const dispatch = useContext(UserContext);

  useEffect(() => {
    const doGet = async () => {
      setError({ ...error, isError: false });
      setIsLoading(true);

      let result;

      try {
        if (!headers) {
          result = await axios(url);
        } else {
          result = await axios(url, headers);
        }

        setData(result.data);
        localStorage.setItem("properties", JSON.stringify(result.data));
      } catch (err) {
        setError({ ...error, isError: true });
        if (err.message === "Network Error") {
          setError({
            ...error,
            isError: true,
            message: "You seem to be offline"
          });
        } else if (err.response.status === 401) {
          setError({
            ...error,
            isError: true,
            message: "Session expired! Please login to continue. "
          });

          localStorage.clear()
          dispatch({ type: types.logoutUser, user: null });
        } else {
          setError({
            ...error,
            isError: true,
            message: err.response.data.error
          });
        }
      }

      setIsLoading(false);
    };
    doGet();
  }, []);
  return [data, isLoading, error];
};

export const PropertySetter = () => {
  const [propertyData, setPropertyData] = useState({});
  const [url, setUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [drawer, setOpenDrawer] = useState(false);


  let token = JSON.parse(localStorage.getItem("token")).access;

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };

  useDidMountEffect(() => {
    const addProperty = async () => {
      setError({ ...error, isError: false });
      setIsLoading(true);

      try {
        let result = await axios.post(url, propertyData, { headers: headers });
        setIsLoading(false);
        setOpenDrawer(false);
        message.success("Your property was successfully added!");
      } catch (err) {
        console.log(err.response);
        setSubmit(false);
        setIsLoading(false);

        err.message === "Network Error"
          ? setError({
              ...error,
              message: "Seems you're offline!",
              isError: true
            })
          : err.response.status === 400
          ? setError({
              ...error,
              message: "You have a similar property exists!",
              isError: true
            })
          : err.response.status === 401
          ? setError({
              error,
              message: "Session expired! Please loggin.",
              isError: true
            })
          : console.log(error);
      }
    };
    addProperty();
  }, [url, submit]);
  return [
    setOpenDrawer,
    drawer,
    isLoading,
    error,
    setUrl,
    setPropertyData,
    setSubmit
  ];
};

export const AuthSetter = () => {
  const [userData, setuserData] = useState({});
  const [url, setUrl] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useContext(UserContext);

  useDidMountEffect(() => {
    const addUser = async () => {
      setError({ ...error, isError: false });
      setIsLoading(true);

      let result;

      try {
        result = await axios.post(url, userData);
        dispatch({ type: types.authSuccess, user: result.data });

        localStorage.setItem("user", JSON.stringify(result.data));

        if (result.data.hasOwnProperty("user")) {
          dispatch({ type: types.userLogin });
          localStorage.setItem("token", JSON.stringify(result.data.user.token));
          localStorage.setItem("isLoggedIn", true);
          history.push({
            pathname: "/dashboard/users/".concat(result.data.user.id),
            state: result.data
          });
        } else {
          history.push({
            pathname: "/login",
            state: result.data
          });
        }

        setIsLoading(false);
      } catch (error) {
        setSubmit(false);
        setIsLoading(false);

        error.message === "Network Error"
          ? setError({
              ...error,
              message: "Seems you're offline!",
              isError: true
            })
          : error.response.status === 400
          ? setError({
              ...error,
              message: "Email or phonenumber is registered",
              isError: true
            })
          : error.response.status === 401
          ? setError({
              error,
              message: error.response.data.error,
              isError: true
            })
          : console.log(error);
      }
    };
    addUser();
  }, [url, submit]);

  return [isLoading, error, setUrl, setuserData, setSubmit];
};


export const DeleteRecord = (endpoint, headers) => {
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [del, setDel] = useState(false)
  const url = `${baseUrl}${endpoint}`;

  useDidMountEffect(() => {
    const deleteRecord = async () => {
      setError({...error, isError: false})
      setIsLoading(true)

      try {
        await axios.delete(url, headers)
        setSuccess("Successfuly deleted!")
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
        setError({...error, isError: true, message: err.response.data})
      }
    };
    deleteRecord()
  }, [del])
  return [isLoading, error, success, setDel]
}