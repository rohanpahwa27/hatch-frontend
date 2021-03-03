import "babel-core/register"
import "babel-polyfill"
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import HttpsRedirect from 'react-https-redirect';

ReactDOM.render(
  <HttpsRedirect>
    <App />
  </HttpsRedirect>,
  document.getElementById("root")
);
