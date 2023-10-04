import React, { useEffect, useState } from "react";
import "./navigation.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserDetails,
  setIsLoggedIn,
  updateCurrentUser,
} from "../../../redux/slices/appSlice";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { resetSlice } from "../../../redux/slices/imageGenerateSlice";
import { toggleSignonModalOpen } from "../../../redux/slices/utilSlice";
import { errorMessageHandler } from "../../utils/utilFunctions";
import axiosClient from "../../utils/axiosClient";
import NewBadge from "../NewBadge/NewBadge";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="navigation-container">
      <div className="menu-icon-container">
        <GiHamburgerMenu onClick={showDrawer} />
      </div>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        width="100%"
        title={<ProfileInfo close={onClose} />}
        className="drawer-container"
        closable={false}
      >
        <div className="drawer-menu-container">
          <Button
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="drawer-menu-btn"
            type="text"
          >
            Home
          </Button>
          <Button
            onClick={() => {
              navigate("/create");
              setOpen(false);
            }}
            className="drawer-menu-btn"
            type="text"
          >
            Create
            <NewBadge />
          </Button>
          {isLoggedIn ? (
            <>
              <Button
                onClick={() => {
                  navigate("/my-profile");
                  setOpen(false);
                }}
                className="drawer-menu-btn"
                type="text"
              >
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
                Settings
              </Button>
              <Button
                type="primary"
                loading={isLoading}
                onClick={handleLogout}
                className="drawer-menu-btn logout"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  dispatch(toggleSignonModalOpen());
                  setOpen(false);
                }}
                className="drawer-menu-btn"
                type="text"
              >
                Login / Signup
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}
