import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { SESSION_COOKIE } from "../Utils/constants";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { isEmpty } from "lodash";
import DepartmentModal from "./DepartmentModal";

const Employee = (props: { user: any }) => {
  const [employee, setEmployee] = useState([]);
  const [model, setModel] = useState(false);
  const [empId, setEmpId] = useState("");
  const getDepartments = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        process.env.REACT_APP_BASE_URL + "/employee",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(SESSION_COOKIE)}`,
          },
        }
      );
      setEmployee(response.data.data);
    } catch (error) {
      // alert("Something went wrong! Try agin");
    }
  };
  useEffect(() => {
    getDepartments();
  }, []);
  const makeManager = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/make-manager",
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(SESSION_COOKIE)}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      alert("Something went wrong! Try agin");
    }
  };
  const handleAssign = (id: string) => {
    setEmpId(id);
    setModel((mdl) => !mdl);
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-5">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All Employees
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          {props.user.type == "EMPLOYEE" && (
            <button
              onClick={makeManager}
              className="inline-block px-4 py-2 mr-5 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm "
            >
              Make yourself Manager
            </button>
          )}
          <Link
            to={"/department"}
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Departments
          </Link>
        </div>
      </div>
      <div className="mt-12 relative h-max overflow-auto">
        {!isEmpty(employee) ? (
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                {Object.keys(employee[0]).map((key) => (
                  <th className="py-3 pr-6">{key}</th>
                ))}
                <th>Assign Department</th>
                {/* <th className="py-3 pr-6">name</th>
              <th className="py-3 pr-6">status</th>
              <th className="py-3 pr-6">Purchase</th>
              <th className="py-3 pr-6">price</th>
              <th className="py-3 pr-6"></th> */}
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {employee.map((item: any, idx) => (
                <tr key={idx}>
                  {Object.keys(employee[0]).map((key) => (
                    <td className="py-3 pr-6">{item[key]}</td>
                  ))}
                  <td>
                    {isEmpty(item?.departmentId) && (
                      <button onClick={() => handleAssign(item?.id)}>
                        Assign Department
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>Employees not found</>
        )}
      </div>
      <DepartmentModal id={empId} open={model} setOpen={setModel} />
    </div>
  );
};

export default Employee;
