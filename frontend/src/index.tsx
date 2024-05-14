import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import router from "./Router";
import { JsxClosingElement, JsxElement } from "typescript";
import RequireAuth from "./Utils/RequireAuth";
import "react-tabulator/lib/styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RequireAuth>
        <App user={undefined} />
      </RequireAuth>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
