import React, { useEffect, useState } from "react";
import "./user-profile.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsernameDetails,
  fetchUsernamePosts,
} from "../../redux/slices/usernameSlice";
import { RiLoader2Fill } from "react-icons/ri";
//@ts-ignore
import UserPostItem from "./UserPostItem/UserPostItem";
import { Button } from "antd";
import Footer from "../Footer/Footer";

export default function UserProfile() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usernameSlice.user);
  const userFound = useSelector((state) => state.usernameSlice.userFound);
  const pageLoading = useSelector((state) => state.usernameSlice.pageLoading);
  const isLoadMoreBtn = useSelector(
    (state) => state.usernameSlice.isLoadMoreBtn
  );
  const postsLoading = useSelector((state) => state.usernameSlice.postsLoading);
  const userPosts = useSelector((state) => state.usernameSlice.user.posts);
  const [page, setPage] = useState(1);

  function handleLoadMore() {
    setPage(page + 1);
  }

  useEffect(() => {
    dispatch(fetchUsernameDetails({ username }));
  }, [username, dispatch]);

  useEffect(() => {
    if (userFound) {
      dispatch(fetchUsernamePosts({ username: username, page: page }));
    }
  }, [userFound, page, username, dispatch]);

  return (
    <>
      {pageLoading ? (
        <>
          <div className="user-loading-container">
            <RiLoader2Fill className="loader-icon" />
          </div>
        </>
      ) : (
        <div className="user-profile-container">
          {userFound ? (
            <>
              <div className="profile-header-container">
                <div className="profile-left">
                  <img src={user.picture} alt="" />
                </div>
                <div className="profile-right">
                  <div className="username">@{user.username}</div>
                  <div className="posts-count">
                    Total Posts: {user.postsLength}
                  </div>
                </div>
              </div>
              <div className="user-posts-container">
                {userPosts.length === 0 ? (
                  postsLoading ? (
                    <div className="user-loading-container">
                      <RiLoader2Fill className="loader-icon" />
                    </div>
                  ) : (
                    <div className="no-post-container">No posts found!</div>
                  )
                ) : (
                  userPosts.map((post, index) => {
                    return <UserPostItem post={post} key={index} />;
                  })
                )}
              </div>
              {userPosts.length !== 0 && (
                <div className="load-more-btn-container">
                  {isLoadMoreBtn && (
                    <Button
                      type="text"
                      className="load-more-btn"
                      loading={postsLoading}
                      onClick={handleLoadMore}
                    >
                      Load More
                    </Button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="username-not-found">
              <h1>User Not Found!</h1>
              <p>Check your username</p>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}
