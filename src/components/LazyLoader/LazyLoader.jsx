import React from "react";
import "./lazy-loader.scss";
import { RiLoader2Fill } from "react-icons/ri";

export default function LazyLoader() {
  return (
    <div className="lazy-loader-container">
      <RiLoader2Fill className="loader-icon" />
    </div>
  );
}
