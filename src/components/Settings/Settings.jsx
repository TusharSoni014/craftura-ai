import React, { useEffect, useState } from "react";
import "./settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Input, Modal } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { fetchUserDetails, updateUsername } from "../../redux/slices/appSlice";
import { errorMessageHandler } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";
import { toggleSignonModalOpen } from "../../redux/slices/utilSlice";

export default function Settings() {
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const user = useSelector((state) => state.appSlice.currentUser);
  const [modalLoading, setModalLoading] = useState(false);
  const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
  const [isDpModalOpen, setDpModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [coupenCode, setCoupenCode] = useState("");
  const [coupenLoading, setCoupenLoading] = useState(false);
  const [newDp, setNewDp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  async function handleCoupenCode() {
    setCoupenLoading(true);
    try {
      await axiosClient.post("/coupen/use", {
        coupenCode: coupenCode,
      });
      toast.success("Coupen successfully used!");
      dispatch(fetchUserDetails());
    } catch (error) {
      errorMessageHandler(error);
    } finally {
      setCoupenLoading(false);
    }
  }

  async function handleConfirmDpChange() {
    setModalLoading(true);
    try {
      await axiosClient.post("/user/changeProfilePicture", {
        pictureUrl: newDp,
      });
      dispatch(fetchUserDetails());
      setDpModalOpen(false);
      toast.success("DP changed successfully!");
    } catch (error) {
      errorMessageHandler(error);
    } finally {
      setModalLoading(false);
    }
  }

  async function handleGetRandomDp() {
    try {
      const response = await axiosClient.get("/user/randomProfile");
      const newDpResponse = response.data.result;
      setNewDp(newDpResponse);
    } catch (error) {
      errorMessageHandler(error);
    }
  }
  const showUsernameModal = () => {
    setUsernameModalOpen(true);
  };
  const handleUsernameChange = async () => {
    setModalLoading(true);
    try {
      if (newUsername === "") {
        return toast.error("Please enter a username");
      }
      await axiosClient.put("/user/change-username", {
        newUsername: newUsername,
      });
      setNewUsername("");
      dispatch(updateUsername(newUsername));
      toast.success("Username changed");
      setUsernameModalOpen(false);
    } catch (error) {
      errorMessageHandler(error);
      if (error.status === 401) {
        dispatch(toggleSignonModalOpen());
      }
    } finally {
      setModalLoading(false);
    }
  };

  const handleUsernameCancel = () => {
    setUsernameModalOpen(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="my-profile-container">
        <div className="my-profile-info-container">
          <h1>Settings</h1>
          <div className="profile-info">
            <div className="left">
              <Avatar
                className="avatar avatar-logo"
                size={60}
                icon={
                  <>
                    <img src={user.picture} alt="" />
                  </>
                }
              />
              <h4 className="word">{user.username}</h4>
            </div>
            <div className="edit-btn">
              <Button
                type="primary"
                onClick={() => showUsernameModal()}
                shape="circle"
              >
                <AiFillEdit />
              </Button>
            </div>
          </div>
          <div className="settings-item profile">
            <div className="left">
              <strong>Profile: </strong>
            </div>
            <div className="right">
              <div className="btn-container">
                <Button
                  onClick={() => {
                    setDpModalOpen(true);
                    handleGetRandomDp();
                  }}
                  type="primary"
                >
                  Change
                </Button>
              </div>
            </div>
          </div>
          <div className="settings-item email-address">
            <div className="left">
              <strong>Email: </strong>
            </div>
            <div className="right">
              <p className="email-text word">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Change Username"
        open={isUsernameModalOpen}
        onOk={handleUsernameChange}
        onCancel={handleUsernameCancel}
        confirmLoading={modalLoading}
        className="username-change-modal"
      >
        <Input
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder={user.username}
        />
      </Modal>
      <Modal
        title="Change Profile Picture"
        open={isDpModalOpen}
        onCancel={() => setDpModalOpen(false)}
        className="dp-change-modal"
        footer={false}
        width={300}
      >
        <div className="img-preview">
          <img src={newDp} alt={newDp} />
        </div>
        <div className="btn-container">
          <Button onClick={handleGetRandomDp} type="primary">
            Randomize
          </Button>
          <Button
            loading={modalLoading}
            onClick={handleConfirmDpChange}
            className="confirm"
            type="primary"
          >
            Confirm Change
          </Button>
        </div>
      </Modal>
    </>
  );
}
