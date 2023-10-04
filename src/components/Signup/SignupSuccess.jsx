import React, { useEffect, useState } from "react";
import "./signup.scss";
import { useDispatch } from "react-redux";
import {
  setIsLoggedIn,
  updateCurrentUser,
} from "../../redux/slices/appSlice";
import { useNavigate } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
import { errorMessageHandler } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";

export default function SignonSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  async function checkUserAuth() {
    try {
      const response = await axiosClient.get("/google/user");
      if (response && response.data) {
        dispatch(updateCurrentUser(response.data));
        dispatch(setIsLoggedIn(true));
        navigate("/create");
      }
    } catch (error) {
      setLoading(false);
      errorMessageHandler(error);
    }
  }
  useEffect(() => {
    checkUserAuth();
  }, []);
  return (
    <div className="signon-success-container">
      <p>
        {loading ? (
          <>
            <RiLoader2Fill className="loader-icon" />
            Please wait...
          </>
        ) : (
          <>Some error occured. Try again !</>
        )}
      </p>
    </div>
  );
}
