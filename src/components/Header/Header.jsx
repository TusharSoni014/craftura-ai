import React, { useEffect, useState } from "react";
import "./header.scss";
import Navigation from "./Navigation/Navigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DesktopNavigation from "./DesktopNavigation/DesktopNavigation";
import { Modal } from "antd";

const Header = () => {
  const siteName = useSelector((state) => state.utilSlice.siteName);
  const navigate = useNavigate();
  const [pageWidth, setPageWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageWidth]);

  return (
    <>
      <div className="header-container">
        <h2
          style={{
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => navigate("/")}
        >
          {siteName}
        </h2>
        {pageWidth > 600 ? <DesktopNavigation /> : <Navigation />}
      </div>
    </>
  );
};

export default Header;
