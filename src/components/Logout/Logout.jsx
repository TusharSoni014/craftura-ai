import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, updateCurrentUser } from "../../redux/slices/appSlice";
import { resetSlice } from "../../redux/slices/imageGenerateSlice";
import axiosClient from "../utils/axiosClient";
import { errorMessageHandler } from "../utils/utilFunctions";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axiosClient.post("/user/logout");
      dispatch(setIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(resetSlice());
      navigate("/");
    } catch (error) {
      errorMessageHandler(error);
    }
  }

  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        color: "grey",
        userSelect: "none",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Token Expired, Redirecting...
    </div>
  );
}
