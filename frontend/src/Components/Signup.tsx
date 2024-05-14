import { FormEvent } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../Utils/axiosClient";
import axios, { AxiosResponse } from "axios";
import { SESSION_COOKIE } from "../Utils/constants";
import Cookies from "js-cookie";

const Signup = () => {
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formDataObject = Object.fromEntries(formData);
      console.log({ formDataObject });

      const response: AxiosResponse = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/signup",
        formDataObject
      );
      const token = response.data?.token;
      Cookies.set(SESSION_COOKIE, token);
      console.log({ response });
    } catch (error) {
      alert("Something went wrong! Try agin");
    }

    // window.location.reload();
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Sign up
          </button>
        </form>
        <div className="text-center">
          <Link
            to={"/"}
            className="text-indigo-600 hover:text-indigo-500"
            // onClick={() => alert("Coming soon")}
          >
            Account exists Sign In?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
