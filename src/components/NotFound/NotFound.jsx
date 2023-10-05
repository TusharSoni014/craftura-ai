import React from "react";
import "./not-found.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-container">
    <h2>404 - Not Found</h2>
      <img
        src="https://cdn-icons-png.flaticon.com/512/1179/1179235.png"
        alt=""
      />
      <p>
        You feel lost? visit home page from <Link to="/">here</Link>.
      </p>
    </div>
  );
}
