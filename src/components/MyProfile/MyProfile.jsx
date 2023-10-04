import React, { useEffect, useState } from "react";
import "./my-profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMyPosts,
  fetchMyPostsCount,
  updateEditMode,
} from "../../redux/slices/currentUserSlice";
import { Button, Switch } from "antd";
import PostItem from "./PostItem/PostItem";
import Footer from "../Footer/Footer";

export default function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.appSlice.currentUser);
  const error = useSelector((state) => state.currentUserSlice.postError);
  const isLoadMoreBtn = useSelector(
    (state) => state.currentUserSlice.isLoadMoreBtn
  );
  const [page, setPage] = useState(1);

  const handleEditMode = (value) => {
    dispatch(updateEditMode(value));
  };

  const myPostsLoading = useSelector(
    (state) => state.currentUserSlice.myPostsLoading
  );
  const editMode = useSelector((state) => state.currentUserSlice.editMode);
  const myPostscount = useSelector(
    (state) => state.currentUserSlice.myPostscount
  );
  const posts = useSelector((state) => state.currentUserSlice.posts);

  useEffect(() => {
    if (posts?.length === 0 && page === 1) {
      dispatch(fetchMyPosts({ page }));
    } else if (page > 1) {
      dispatch(fetchMyPosts({ page }));
    }
    dispatch(fetchMyPostsCount());
  }, [dispatch, page]);

  if (error)
    return (
      <div className="global-error-container">
        {error}
        <Button
          type="primary"
          className="danger-btn"
          onClick={() => navigate("/logout")}
        >
          Logout
        </Button>
      </div>
    );

  return (
    <>
      <div className="my-profile-page-container">
        <div className="profile-header-container">
          <div className="profile-left">
            <img src={user.picture} alt="" />
          </div>
          <div className="profile-right">
            <div className="username">@{user.username}</div>
            <div className="posts-count">Total Posts: {myPostscount}</div>
            {myPostscount !== 0 && (
              <div className="edit-mode-container">
                <p>Edit Mode:</p>
                <Switch
                  defaultChecked={editMode}
                  className="edit-mode-switch-toggle"
                  onChange={handleEditMode}
                />
              </div>
            )}
          </div>
        </div>
        <div className="profile-posts-container">
          <div className="posts-container">
            {posts?.map((post, index) => {
              return (
                <PostItem
                  setPage={setPage}
                  url={post.url}
                  id={post._id}
                  key={index}
                />
              );
            })}
          </div>
          {posts?.length === 0 && !myPostsLoading ? (
            <div className="no-post-container">No posts found!</div>
          ) : (
            isLoadMoreBtn && (
              <div className="load-more-btn-container">
                <Button
                  loading={myPostsLoading}
                  onClick={() => setPage(page + 1)}
                  type="text"
                  className="load-more-btn"
                >
                  Load More
                </Button>
              </div>
            )
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}
