import React, { useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyCurrentPosts,
  fetchMyPosts,
  fetchMyPostsCount,
} from "../../../redux/slices/currentUserSlice";
import "./post-item.scss";
import { errorMessageHandler, handleDownload } from "../../utils/utilFunctions";
import axiosClient from "../../utils/axiosClient";
import { fetchPostDetailsDrawer } from "../../../redux/slices/postDetailsSlice";

export default function PostItem({ url, id, setPage }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const editMode = useSelector((state) => state.currentUserSlice.editMode);
  const dispatch = useDispatch();

  async function handlePostDetails() {
    dispatch(fetchPostDetailsDrawer({ postId: id, base64: url }));
  }

  //how to pass post id inside handleok from loop?
  const showModal = (postId) => {
    setCurrentImageId(postId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePostDelete = async () => {
    setDeleteLoading(true);
    try {
      await axiosClient.delete(`/image/delete/${currentImageId}`);
      toast.success("Post deleted successfully");
      dispatch(emptyCurrentPosts());
      dispatch(fetchMyPostsCount());
      dispatch(fetchMyPosts({ page: 1 }));
      setPage(1);
    } catch (error) {
      errorMessageHandler(error);
    } finally {
      setDeleteLoading(false);
      setIsModalOpen(false);
      setCurrentImageId(null);
    }
  };

  return (
    <>
      <div className="post-item">
        <img src={url} alt="generated pic" onClick={handlePostDetails} />
        {editMode && (
          <div className="post-btn-container">
            <Button
              type="primary"
              onClick={() => handleDownload(url)}
              className="post-download-btn"
            >
              <BiSolidDownload />
            </Button>
            <Button
              type="primary"
              onClick={() => showModal(id)}
              className="post-delete-btn"
              loading={deleteLoading}
            >
              <BsFillTrashFill />
            </Button>
          </div>
        )}
      </div>
      <Modal
        title="Delete Post?"
        open={isModalOpen}
        onOk={handlePostDelete}
        onCancel={handleCancel}
        className="delete-post-modal"
        okText="Delete"
        confirmLoading={deleteLoading}
        okButtonProps={{ className: "delete-post-btn" }}
      >
        <p>Are you sure you want to delete this post?</p>
        <small>This is action is not reversible.</small>
      </Modal>
    </>
  );
}
