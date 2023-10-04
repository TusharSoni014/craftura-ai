import React, { useEffect, useState } from "react";
import "./home.scss";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeImages } from "../../redux/slices/homeSlice";
import ImgLoader from "../ImgLoader/ImgLoader";
import { errorMessageHandler } from "../utils/utilFunctions";
import { fetchPostDetailsDrawer } from "../../redux/slices/postDetailsSlice";
import Footer from "../Footer/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const siteName = useSelector((state) => state.utilSlice.siteName);
  const posts = useSelector((state) => state.homeSlice.posts);
  const isFetching = useSelector((state) => state.homeSlice.postsLoading);
  const isMorePosts = useSelector((state) => state.homeSlice.isMorePosts);
  const [page, setPage] = useState(1);

  async function handlePostDetails(post) {
    dispatch(fetchPostDetailsDrawer({ postId: post._id, base64: post.url }));
  }

  async function handleLoadMore() {
    try {
      setPage(page + 1);
    } catch (error) {
      errorMessageHandler(error);
    }
  }

  useEffect(() => {
    if (posts?.length === 0 && page === 1) {
      dispatch(fetchHomeImages({ page: page }));
    } else if (page > 1) {
      dispatch(fetchHomeImages({ page: page }));
    }
  }, [page, dispatch]);

  return (
    <>
      <div className="home-container">
        <div className="banner">
          <h1 className="animated-text">{siteName}</h1>
          <h3>Dall·E Alternative - Generate UNLIMITED Images for FREE.</h3>
        </div>
        <div className="user-post-section">
          <h1>Latest Posts</h1>
          <p>Some awesome creations by you.</p>
          <div className="img-creations">
            {isFetching && page === 1 ? (
              <div className="home-page-loader">
                <ImgLoader />
              </div>
            ) : (
              posts &&
              posts?.map((img, index) => {
                return (
                  <img
                    loading="lazy"
                    onClick={() => handlePostDetails(img)}
                    key={index}
                    src={img.url}
                  />
                );
              })
            )}
          </div>
          <div className="btn-container">
            {posts?.length !== 0 &&
              (isMorePosts ? (
                <Button
                  type="text"
                  className="load-more-btn"
                  loading={isFetching}
                  onClick={handleLoadMore}
                >
                  Load More
                </Button>
              ) : null)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
