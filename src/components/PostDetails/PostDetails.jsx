import React from "react";
import "./post-details.scss";
import { useDispatch, useSelector } from "react-redux";
import { RiLoader2Fill } from "react-icons/ri";
import { handleDownload } from "../utils/utilFunctions";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { BiSolidDownload } from "react-icons/bi";
import { FaClone } from "react-icons/fa";
import { updatePrompt } from "../../redux/slices/imageGenerateSlice";
import {
  updateNegPrompt,
  updateSeed,
} from "../../redux/slices/settingsSlice";
import { updatePostDetailOpenState } from "../../redux/slices/postDetailsSlice";
import { toast } from "react-toastify";
import { BsFillSuitHeartFill } from "react-icons/bs";

export default function PostDetails({ cloneBtn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postDetailsLoading = useSelector(
    (state) => state.postDetailsSlice.postDetailsLoading
  );
  const user = useSelector((state) => state.appSlice.currentUser);
  const post = useSelector((state) => state.postDetailsSlice.post);

  const copyInnerText = (text) => {
    window.navigator.clipboard.writeText(text.innerText);
    toast.info("Copied to clipboard!");
  };

  const handleFavPost = async (post) => {
    console.log(post);
  };

  const handleClonePost = (post) => {
    dispatch(updatePrompt(post.prompt));
    dispatch(updateNegPrompt(post.negPrompt));
    dispatch(updateSeed(post.seed));
    navigate("/create");
    dispatch(updatePostDetailOpenState(false));
    toast.success("Post Cloned Successfully !");
  };

  return (
    <div className="post-details-drawer-container">
      {postDetailsLoading ? (
        <div className="post-details-loading-container">
          <RiLoader2Fill className="loader-icon" />
        </div>
      ) : (
        <>
          <div className="details-left">
            <img src={post.img} alt="" />
          </div>
          <div className="details-right">
            <div className="detail-item">
              <small>Prompt:</small>
              <div onClick={(e) => copyInnerText(e.target)} className="prompt">
                {post.prompt}
              </div>
            </div>
            <div className="detail-item">
              <small>Negative Prompt:</small>
              <div
                onClick={(e) => copyInnerText(e.target)}
                className="neg-prompt"
              >
                {post.negPrompt === "" ? "Empty" : post.negPrompt}
              </div>
            </div>
            <div className="detail-item">
              <small>Seed:</small>
              <div onClick={(e) => copyInnerText(e.target)} className="seed">
                {post.seed}
              </div>
            </div>
            <div className="detail-item">
              <small>Creation Date:</small>
              <div className="date">{post.createdAt}</div>
            </div>
            {post.owner && user.username !== post.owner ? (
              <div className="detail-item">
                <small>Owner Profile:</small>
                <div className="owner-container">
                  <Link target="blank" to={`/profile/${post.owner}`}>
                    {post.owner}
                  </Link>
                </div>
              </div>
            ) : null}
            <div className="post-actions-buttons-container">
              <small>Post Actions:</small>
              <div className="buttons">
                <Button
                  type="primary"
                  className="post-action-btn"
                  onClick={() => {
                    handleDownload(post.img);
                    console.log(post.img);
                  }}
                >
                  <BiSolidDownload className="icon" />
                </Button>
                <Button
                  type="primary"
                  className="post-action-btn"
                  onClick={() => handleClonePost(post)}
                >
                  <FaClone className="icon" />
                </Button>
                {/* <Button
                  type="primary"
                  className="post-action-btn"
                  onClick={() => handleFavPost(post)}
                  danger
                >
                  <BsFillSuitHeartFill className="icon" />
                </Button> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

PostDetails.defaultProps = {
  cloneBtn: true,
};
