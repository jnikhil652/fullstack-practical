import * as Dialog from "@radix-ui/react-dialog";
import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { FormEvent, useEffect, useState } from "react";
import { SESSION_COOKIE } from "../Utils/constants";
import { isEmpty } from "lodash";

const DepartmentModal = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Function;
  id: string;
}) => {
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
    } catch (error) {
      // alert("Something went wrong! Try agin");
    }
  };
  useEffect(() => {
    getDepartments();
  }, []);
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formDataObject = Object.fromEntries(formData);
      const response: AxiosResponse = await axios.post(
        process.env.REACT_APP_BASE_URL + "/employee/assign-department",
        { ...formDataObject, id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get(SESSION_COOKIE)}`,
          },
        }
      );
      setOpen(false);
    } catch (error) {
      alert("Something went wrong! Try agin");
    }
  };
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
          <div className="bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Assign Department
              </Dialog.Title>
              <Dialog.Close
                onClick={() => setOpen(false)}
                className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            <div className="relative w-72 max-w-full mx-auto mb-4 py-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <form onSubmit={handleSubmit}>
                <select
                  name="departmentId"
                  className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                >
                  {!isEmpty(departments) &&
                    departments.map((elem: any) => (
                      <option value={elem.id}>{elem.name}</option>
                    ))}
                </select>
                <div className="text-center mt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DepartmentModal;
