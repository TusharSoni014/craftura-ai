import React from "react";
import "./guide.scss";
import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

export default function Guide() {
  const siteName = useSelector((state) => state.utilSlice.siteName);
  return (
    <>
      <div className="guide-page-container">
        <h1>{siteName} Guide</h1>
        <h2>What are (), {"{}"}, and [] in prompts?</h2>
        <ul>
          <li className="item">
            The ()s, []s and {"{}"}s do different things, and some can do
            multiple things. And most can be used in both +/- prompts
          </li>
          <li className="item">
            Use of ()
            <ul>
              <li>These tell the AI to focus more on that specific term.</li>
              <li>
                (keyword) - will increase the keyword weight by x1.1 the default
                weight.
              </li>
              <li>((keyword)) - will increase it by x1.21.</li>
              <li>(((keyword))) - will increase it by x1.33.</li>
              <li>3 sets of ()s is the highest recommended level.</li>
            </ul>
          </li>
          <li className="item">
            Use of []
            <ul>
              <li>
                [keyword] - will decrease the keyword weight by x.09 the default
                weight.
              </li>
              <li>[[keyword]] - will decrease it by x0.81.</li>
              <li>[[[keyword]]] - will decrease it by x0.73.</li>
              <li>3 sets of []s is the highest recommended level.</li>
            </ul>
          </li>
          <li className="item">
            You can be more specific with your keyword weighting by using the
            following syntax
            <ul>
              <li>
                (keyword:1.5) - will increase the keyword weighting by x1.5 the
                default weight
              </li>
              <li>
                (keyword:0.25) - will decrease the keyword weighting by x0.25
                the default weight.
              </li>
              <li>This can be used with both () and [].</li>
              <li>
                The highest recommended weighting is 1.5 (you can theoretically
                go as high as 2 but this can cause problems as it makes the AI
                to focus too much on this specific part of the prompt).
              </li>
            </ul>
          </li>
          <li className="item">
            []s can also be used to blend two terms together.
            <ul>
              <li>
                [keyword1:keyword2:0.5] - this will give a slightly biased
                emphasis to keyword1 as it is first in the list.
              </li>
              <li>
                [keyword1:keyword2:0.3] - this will give greater emphasis to
                keyword2
              </li>
              <li>
                [keyword1:keyword2:0.7] - this will give greater emphasis to
                keyword1.
              </li>
              <li>
                Or to blend three or more terms together.
                [keyword1|keyword2|keyword3] - this will merge all the terms
                together.
              </li>
            </ul>
          </li>
          <li className="item">
            Use of {"{}"}s
            <ul>
              <li>These can be used in a few ways.</li>
              <li>
                {"{keyword1|keyword2|keyword3}"} can be used to list things you
                want to appear/happen together
              </li>
              <li>
                {"{keyword1:keyword2}"} as an alternate way to blend terms.
              </li>
            </ul>
          </li>
        </ul>
        <Link
          target="blank"
          to="https://generativeai.pub/stable-diffusion-enables-the-control-of-camera-distance-and-angles-using-prompts-53ca4d1c9981"
        >
          👉 A guide to control camera angle in generative AI models with
          prompts.
        </Link>
      </div>
      <Footer />
    </>
  );
}
