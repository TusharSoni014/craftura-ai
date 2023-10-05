import React, { useEffect, useState } from "react";
import "./desktp-navagation.scss";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetails,
  setIsLoggedIn,
  updateCurrentUser,
} from "../../../redux/slices/appSlice";
import { resetSlice } from "../../../redux/slices/imageGenerateSlice";
import { toggleSignonModalOpen } from "../../../redux/slices/utilSlice";
import { BiUserCircle } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { errorMessageHandler } from "../../utils/utilFunctions";
import axiosClient from "../../utils/axiosClient";
import NewBadge from "../NewBadge/NewBadge";

export default function DesktopNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const user = useSelector((state) => state.appSlice.currentUser);

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await axiosClient.post("/user/logout");
      dispatch(setIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(resetSlice());
      setOpen(false);
      navigate("/");
    } catch (error) {
      errorMessageHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="desktop-navigation-container">
        <div className="btn-container">
          <Button
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            className="navigation-btn"
            type="text"
          >
            Home
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              navigate("/create");
            }}
            className="navigation-btn"
            type="text"
          >
            Create
            <NewBadge />
          </Button>
        </div>
        {isLoggedIn ? (
          <>
            <Avatar
              style={{
                cursor: "pointer",
              }}
              className="avatar-logo"
              size={45}
              onClick={() => setOpen((state) => !state)}
              icon={
                <>
                  <img src={user.picture} alt="" />
                </>
              }
            />
          </>
        ) : (
          <Button
            onClick={() => dispatch(toggleSignonModalOpen())}
            className="navigation-btn"
            type="primary"
            shape="round"
          >
            Login / Signup
          </Button>
        )}
      </div>
      <Drawer
        title="Profile"
        placement="right"
        onClose={onClose}
        open={open}
        maskStyle={{ backgroundColor: "transparent" }}
        closeIcon={false}
        headerStyle={{ display: "none" }}
        width={200}
        style={{ boxShadow: "none !important" }}
        bodyStyle={{ boxShadow: "none !important" }}
        className="profile-drawer"
      >
        <div className="btn-container">
          <Button
            onClick={() => {
              navigate("/my-profile");
              setOpen(false);
            }}
            className="drawer-menu-btn"
            type="text"
          >
            <BiUserCircle className="icon" />
            My Profile
          </Button>
          <Button
            onClick={() => {
              navigate("/settings");
              setOpen(false);
            }}
            className="drawer-menu-btn"
            type="text"
          >
            <IoMdSettings className="icon" />
            Settings
          </Button>
          <Button
            type="primary"
            loading={isLoading}
            onClick={handleLogout}
            className="drawer-menu-btn logout"
          >
            <FiLogOut className="icon" /> Log Out
          </Button>
        </div>
      </Drawer>
    </>
  );
}
