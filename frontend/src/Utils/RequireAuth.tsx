import Cookies from "js-cookie";
import { SESSION_COOKIE } from "./constants";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { isEmpty } from "lodash";

const RequireAuth = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const url = window.location.pathname;
  const token = Cookies.get(SESSION_COOKIE);
  const handleLogout = () => {
    Cookies.remove(SESSION_COOKIE);
    window.location.reload();
  };
  useEffect(() => {
    if (!token && url !== "/signup") {
      navigate("/");
    } else if (url == "/" || url == "/signup") {
      navigate("employee");
    } else {
      (async () => {
        try {
          const response: AxiosResponse = await axios.get(
            process.env.REACT_APP_BASE_URL + "/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
                // 'Access-Control-Allow-Credentials':'true',
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          setUser(response.data.data);
        } catch (error: any) {
          if (error.response.status === 401) {
            handleLogout();
          }
          console.log({ error });
        }
      })();
    }
  }, []);

  return (
    <div>
      {!isEmpty(token) && (
        <div>
          <button
            onClick={handleLogout}
            className="inline-block px-4 py-2 mr-5 text-white duration-150 font-medium bg-red-600 rounded-lg hover:bg-red-500 active:bg-red-700 md:text-sm "
          >
            Logout
          </button>
        </div>
      )}
      <div>{React.cloneElement(children, { user })}</div>
    </div>
  );
};

export default RequireAuth;
