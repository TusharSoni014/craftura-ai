import React, { useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  emptyCurrentPosts,
  fetchMyPosts,
  fetchMyPostsCount,
} from "../../../redux/slices/currentUserSlice";
import "./post-item.scss";
import { errorMessageHandler } from "../../utils/utilFunctions";
import axiosClient from "../../utils/axiosClient";
import { fetchPostDetailsDrawer } from "../../../redux/slices/postDetailsSlice";

export default function PostItem({ url, id, setPage }) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const dispatch = useDispatch();

  async function handlePostDetails() {
    dispatch(fetchPostDetailsDrawer({ postId: id, base64: url }));
  }

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
