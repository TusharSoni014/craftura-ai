import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./create.scss";
import ImagePreview from "./ImagePreview/ImagePreview";
import { IoMdSettings } from "react-icons/io";
import { RiLoader2Fill } from "react-icons/ri";
import nsfwLogo from "../../assets/nsfw.jpeg";
import {
  setIsGenerated,
  setIsLoading,
  updateImageURL,
  updatePreviousGenerations,
  updatePrompt,
} from "../../redux/slices/imageGenerateSlice";
import PreviousImages from "./PreviousImages/PreviousImages";
import { Button, Drawer, Modal, Tour } from "antd";
import { Link } from "react-router-dom";
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
  const amount = useSelector((state) => state.settingsSlice.amount);
  const multiPosts = useSelector((state) => state.multiPostCreateSlice.posts);
  const inputPromptRef = useRef(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNsfwModalOpen, setIsNsfwModalOpen] = useState(false);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const wordsArray = [
    "nsfw",
    "nude",
    "kissing",
    "kissed",
    "kiss",
    "naked",
    "breasts",
    "pussy",
    "vagina",
    "boobs",
    "sex",
    "penis",
    "butt",
    "ass",
    "fuck",
    "fucking",
    "dick",
    "cock",
    "tits",
    "small girl",
    "sexy",
    "bikini",
    "full body",
    "thong",
    "bottomless",
    "teen girl",
    "thongs",
    "teenage",
    "teen",
    "high cut",
    "no clothes",
    "cleavage"
  ];

  function containsNSFW(prompt, wordsArray) {
    const lowerCasePrompt = prompt.toLowerCase();
    const regexPattern = new RegExp(
      `(\\b(?:${wordsArray.join("|")})\\b)|[({[\\s]*(\\b(?:${wordsArray.join(
        "|"
      )})\\b)[\\s]*[})\\]]`,
      "i"
    );
    return regexPattern.test(lowerCasePrompt);
  }

  async function handleImageGenerate(e) {
    e.preventDefault();
    if (prompt === "") {
      return toast.info("Type something in the prompt to generate!");
    } else if (containsNSFW(prompt, wordsArray)) {
      setIsNsfwModalOpen(true);
      return toast.warn("Your prompt contains NSFW characters!");
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
              Watch your imagination transform into reality using our AI powered
              image generator for FREE!
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
      <Modal
        centered={true}
        title="NSFW Mode !"
        open={isNsfwModalOpen}
        className="nsfw-modal"
        onCancel={() => setIsNsfwModalOpen(false)}
        footer={false}
      >
        <div className="nsfw-modal-container">
          <div className="logo-container">
            <img src={nsfwLogo} alt="nsfw logo" />
          </div>
          <div className="info">
            Your prompt contain NSFW words, if you want to try our new NSFW
            Image creation tool, then visit{" "}
            <Link target="_blank" to="https://www.sexyprompt.xyz/">
              <Button style={{ margin: "10px 0 0 0" }} type="primary" block>
                Sexy Prompt
              </Button>
            </Link>
          </div>
        </div>
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
