import React from "react";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import "./profile-info.scss";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo({ close }) {
  const user = useSelector((state) => state.appSlice.currentUser);
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const navigate = useNavigate();

  return (
    <div className="profile-info-container">
      {isLoggedIn && (
        <div className="profile-info">
          <Avatar
            className="avatar-logo"
            onClick={() => {
              navigate("/settings");
              close();
            }}
            size={45}
            icon={
              <>
                <img src={user.picture} alt="" />
              </>
            }
          />
        </div>
      )}
      <div onClick={() => close()} className="close-icon-container">
        <VscClose className="close-icon" />
      </div>
    </div>
  );
}
