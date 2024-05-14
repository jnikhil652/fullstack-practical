import axios, { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../Utils/axiosClient";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SESSION_COOKIE } from "../Utils/constants";
import { isEmpty } from "lodash";
import DepartmentModal from "./DepartmentModal";

const Department = (props: { user: any }) => {
  console.log({ props });

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        process.env.REACT_APP_BASE_URL + "/department",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(SESSION_COOKIE)}`,
          },
        }
      );
      setDepartments(response.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (props.user && props.user.type === "MANAGER") {
      getDepartments();
    } else {
      navigate("/employee");
    }
  }, [navigate]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const formDataObject = Object.fromEntries(formData);
      console.log({ formDataObject });
      const response: AxiosResponse = await axios.post(
        process.env.REACT_APP_BASE_URL + "/department",
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(SESSION_COOKIE)}`,
          },
        }
      );
      getDepartments();
    } catch (error) {
      alert("Something went wrong! Try agin");
    }
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-5">
      <div className="items-start justify-between md:flex">
        <div className="mt-3 md:mt-0">
          <Link
            to={"/employee"}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Employees
          </Link>
        </div>
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setShow((prev) => !prev)}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Department
          </button>
        </div>
      </div>
      {show && (
        <div className="items-start justify-between md:flex">
          <div className="mt-3 md:mt-0"></div>
          <div className="mt-3 md:mt-0">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">Department Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>

              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="mt-12 relative h-max overflow-auto">
        {!isEmpty(departments) ? (
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                {Object.keys(departments[0]).map((key) => (
                  <th className="py-3 pr-6">{key}</th>
                ))}
                {/* <th className="py-3 pr-6">name</th>
              <th className="py-3 pr-6">status</th>
              <th className="py-3 pr-6">Purchase</th>
              <th className="py-3 pr-6">price</th>
              <th className="py-3 pr-6"></th> */}
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {departments.map((item, idx) => (
                <tr key={idx}>
                  {Object.keys(departments[0]).map((key) => (
                    <td className="py-3 pr-6">{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>Departments not found</>
        )}
      </div>
    </div>
  );
};

export default Department;
