import React from "react";
import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Department from "./Components/Department";
import Employee from "./Components/Employee";

function App(props: { user: any }) {
  console.log({ props });

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="department" element={<Department {...{ ...props }} />} />
      <Route path="employee" element={<Employee {...{ ...props }} />} />
    </Routes>
  );
}

export default App;
