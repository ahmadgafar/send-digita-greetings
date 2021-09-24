import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Api from "./Api";

export default function App() {
  const [apiResponse, setApiResponse] = useState("hello");

  const callApi = () => {
    Api.testApi.get().then((resp) => setApiResponse(resp.data));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div>{apiResponse}</div>
      {console.log(apiResponse)}
    </div>
  );
}
