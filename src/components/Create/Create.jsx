import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./create.scss";
import ImagePreview from "./ImagePreview/ImagePreview";
import { IoMdSettings } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";
import {
  setIsGenerated,
  setIsLoading,
  updateImageURL,
  updatePreviousGenerations,
  updatePrompt,
} from "../../redux/slices/imageGenerateSlice";
import PreviousImages from "./PreviousImages/PreviousImages";
import { Button, Drawer, Modal, Tour } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchUserDetails,
  updateHelperTourState,
} from "../../redux/slices/appSlice";

import { toggleSignonModalOpen } from "../../redux/slices/utilSlice";
import PreviousImagesMobile from "./PreviousImagesMobile/PreviousImagesMobile";
import GeneratorSettings from "./GeneratorSettings/GeneratorSettings";
import { errorMessageHandler, handleDownload } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";
import {
  clearPosts,
  updatePosts,
} from "../../redux/slices/multiPostCreateSlice";
import { toast } from "react-toastify";

export default function Create() {
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const siteName = useSelector((state) => state.utilSlice.siteName);
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const helperTourActive = useSelector(
    (state) => state.appSlice.helperTourActive
  );
  const prompt = useSelector((state) => state.imageGenerateSlice.prompt);
  const isLoading = useSelector((state) => state.imageGenerateSlice.isLoading);
  const seed = useSelector((state) => state.settingsSlice.seed);
  const negPrompt = useSelector((state) => state.settingsSlice.negPrompt);
  const privateMode = useSelector((state) => state.settingsSlice.privateMode);
  const amount = useSelector((state) => state.settingsSlice.amount);
  const user = useSelector((state) => state.appSlice.currentUser);
  const multiPosts = useSelector((state) => state.multiPostCreateSlice.posts);
  const inputPromptRef = useRef(null);
  const navigate = useNavigate();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  ///

  const steps = [
    {
      title: "Type Prompt",
      description: (
        <>
          Type your prompt/text about the image, you want to generate, and we
          will generate the image for you using AI.{" "}
          <Link target="blank" to="/guide">
            Read Prompt Guide
          </Link>
        </>
      ),
      target: () => inputPromptRef.current,
    },
    {
      title: "Generator Settings",
      description: (
        <>
          Modify your output, by changing settings of AI by applying, seed,
          negative prompt, amount and more.
        </>
      ),
      target: () => ref2.current,
    },
    {
      title: "Start creating image!",
      description: (
        <>
          After you entered your prompt, and selected your seed or negative
          prompt from the generator settings, you can finally create the image
          you wanted!
        </>
      ),
      target: () => ref3.current,
    },
  ];

  ///

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const showSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };
  const handleCancelSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageWidth]);

  async function handleImageGenerate(e) {
    e.preventDefault();
    if (prompt === "") {
      return toast.info("Type something in the prompt to generate!");
    }
    try {
      if (isLoggedIn) {
        dispatch(clearPosts());
        dispatch(setIsLoading(true));
        dispatch(setIsGenerated(true));
        var response = await axiosClient.post("/image/generate", {
          prompt: prompt,
          amount: amount,
          negPrompt: negPrompt,
          seed: seed,
        });
        if (amount > 1) {
          setDrawerOpen(true);
          response.data.output.map((img) => {
            dispatch(updatePosts(`data:image/jpeg;base64,${img.image}`));
          });
        }
        dispatch(updateImageURL(response.data.output[0].image));
        dispatch(updatePreviousGenerations(response.data.output));
        inputPromptRef.current.focus();
      } else {
        dispatch(toggleSignonModalOpen());
      }
    } catch (error) {
      errorMessageHandler(error);
      if (error.status === 401) {
        dispatch(toggleSignonModalOpen());
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  }
  return (
    <>
      <Tour
        open={helperTourActive}
        onClose={() => dispatch(updateHelperTourState(false))}
        steps={steps}
      />
      <div className="create-page-container">
        <div className="create-main-container">
          <div className="prompt-container-left">
            <h1 className="animated-text">{siteName}</h1>
            <p className="intro-text">
              Convert words to images with {siteName}'s free AI image generator.
              Watch your imagination transform into reality using our AI powered image generator for FREE!
            </p>
            <form onSubmit={handleImageGenerate} className="prompt-form">
              <input
                autoFocus
                ref={inputPromptRef}
                type="text"
                placeholder="Enter your prompt to generate your fantasy image (English)"
                value={prompt}
                disabled={isLoading}
                onChange={(e) => {
                  dispatch(updatePrompt(e.target.value));
                }}
              />
              <div className="btn-container">
                <div
                  ref={ref2}
                  className={
                    isLoading ? "setting-button disabled" : "setting-button"
                  }
                  onClick={() => showSettingsModal()}
                >
                  <IoMdSettings />
                </div>
                <button
                  ref={ref3}
                  className={
                    isLoading || prompt === ""
                      ? "generate-btn disabled"
                      : "generate-btn"
                  }
                  htmltype="submit"
                >
                  {isLoading ? (
                    <div className="btn-loader">
                      Loading
                      <RiLoader2Fill className="loader-icon" />
                    </div>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </form>
            {pageWidth > 768 && <PreviousImages />}
          </div>
          <div className="output-preview-container">
            <ImagePreview />
          </div>
          {pageWidth < 768 && <PreviousImagesMobile />}
        </div>
      </div>
      <Modal
        centered={true}
        title="Generator Settings"
        open={isSettingsModalOpen}
        className="settings-modal"
        onCancel={handleCancelSettingsModal}
        footer={false}
      >
        <GeneratorSettings
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          handleImageGenerate={(e) => handleImageGenerate(e)}
        />
      </Modal>
      <Drawer
        title="Created Posts"
        placement="right"
        width="100%"
        onClose={onDrawerClose}
        open={drawerOpen}
        className="multi-post-drawer"
      >
        {multiPosts.map((img, index) => {
          return (
            <div className="multi-post-item">
              <img key={index} src={img} alt="generated image" />
              <Button
                onClick={() => handleDownload(img)}
                style={{ borderRadius: 0 }}
                type="primary"
                block
              >
                Download
              </Button>
            </div>
          );
        })}
      </Drawer>
    </>
  );
}
