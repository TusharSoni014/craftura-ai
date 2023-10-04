import React from "react";
import "./not-found.scss";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-container">
    <h2>404 - Not Found</h2>
      <img
        src="https://images.vexels.com/media/users/3/253242/isolated/preview/fd4d3f707a4b17a1098bc72a6106340e-sticking-tongue-out-color-stroke.png"
        alt=""
      />
      <p>
        You feel lost? visit home page from <Link to="/">here</Link>.
      </p>
    </div>
  );
}
