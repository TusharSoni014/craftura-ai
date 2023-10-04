import React from "react";
import "./previousimagecontainermobile.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetailsDrawer } from "../../../redux/slices/postDetailsSlice";
import { toast } from "react-toastify";

export default function PreviousImagesMobile() {
  const dispatch = useDispatch()
  const previousImages = useSelector(
    (state) => state.imageGenerateSlice.previousGenerations
  );
  const enablePrevGen = useSelector(
    (state) => state.imageGenerateSlice.enablePrevGen
  );
  const prevGenPreviewCount = useSelector(
    (state) => state.imageGenerateSlice.prevGenPreviewCount
  );
  async function handlePostDetails(post) {
    if(!post._id){
      toast.error("Post data not found")
    }
    else{
      dispatch(
        fetchPostDetailsDrawer({
          postId: post._id,
          base64: `data:image/jpeg;base64,${post.image}`,
        })
      );
    }
  }
  return (
    <>
      <h2 style={{ margin: "10px 0", textAlign: "left" }}>
        Previously Generated
      </h2>
      <div className="previous-image-mobile-container">
        {previousImages.length === 0 ? (
          <div className="img-preview-text">
            {enablePrevGen ? (
              <>
                Previous {prevGenPreviewCount} generated images will be shown
                here.
              </>
            ) : (
              <>Disabled</>
            )}
          </div>
        ) : (
          previousImages.map((img, index) => {
            return (
              <img
                onClick={() => handlePostDetails(img)}
                key={index}
                src={`data:image/jpeg;base64,${img.image}`}
              />
            );
          })
        )}
      </div>
    </>
  );
}
