import React, { useState, useEffect } from "react";
import "./image-preview.scss";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { Button } from "antd";
import pic1 from "../../../assets/home/pic1.webp";
import pic2 from "../../../assets/home/pic2.webp";
import pic3 from "../../../assets/home/pic3.webp";
import pic4 from "../../../assets/home/pic4.webp";
import pic5 from "../../../assets/home/pic5.webp";
import { handleDownload } from "../../utils/utilFunctions";

export default function ImagePreview() {
  const isGenerated = useSelector(
    (state) => state.imageGenerateSlice.isGenerated
  );
  const isLoading = useSelector((state) => state.imageGenerateSlice.isLoading);
  const imageUrl = useSelector((state) => state.imageGenerateSlice.imageURL);

  const productionImageArray = [
    {
      image: pic1,
      prompt:
        "A serene moonlit lake nestled between towering mountains, reflecting the starry night sky",
    },
    {
      image: pic2,
      prompt:
        "A bustling futuristic metropolis with towering skyscrapers, advanced monorail systems, and holographic advertisements.",
    },
    {
      image: pic3,
      prompt:
        "A medieval castle perched atop a steep hill, surrounded by a vast, rolling meadow dotted with wildflowers.",
    },
    {
      image: pic4,
      prompt:
        "A sun-kissed vineyard with rows of lush grapevines, overlooked by a rustic Tuscan villa and distant rolling hills.",
    },
    {
      image: pic5,
      prompt:
        "A subterranean cavern adorned with intricate, bioluminescent crystals, casting an ethereal glow throughout the chamber.",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % productionImageArray.length
      );
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="image-preview-container">
      {!isGenerated ? (
        productionImageArray.map((imageObj, index) => (
          <div
            key={index}
            className={`fade-image ${
              index === currentImageIndex ? "active" : ""
            }`}
            style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
          >
            <img src={imageObj.image} alt={imageObj.prompt} />
            <div className="prompt-highlight-text">
              <p className="prompt-title-box">Prompt</p>{" "}
              <small>{imageObj.prompt}</small>
            </div>
          </div>
        ))
      ) : (
        <div className="image-preview-item">
          {isLoading ? (
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            <div className="generated-img-container">
              <>
                <img
                  src={`data:image/jpeg;base64,${imageUrl}`}
                  alt="Finalizing Image..."
                  loading="lazy"
                  width="100%"
                  height="100%"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="generated-img-button-section">
                  <Button
                    onClick={() =>
                      handleDownload(`data:image/webp;base64,${imageUrl}`)
                    }
                    className="img-download-btn"
                    type="primary"
                    shape="round"
                  >
                    Download
                  </Button>
                </div>
              </>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
