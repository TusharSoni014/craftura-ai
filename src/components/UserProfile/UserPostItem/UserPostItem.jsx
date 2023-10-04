import React from "react";
import "./user-post-item.scss";
import { useDispatch } from "react-redux";
import { fetchPostDetailsDrawer } from "../../../redux/slices/postDetailsSlice";

export default function UserPostItem(post) {
  const dispatch = useDispatch()
  async function handlePostDetails() {
    dispatch(
      fetchPostDetailsDrawer({ postId: post.post._id, base64: post.post.url })
    );
  }
  return (
    <div className="username-post-item">
      <img
        onClick={handlePostDetails}
        src={post.post.url}
        alt={post.post.prompt}
      />
    </div>
  );
}
