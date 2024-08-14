import React from "react";
import { useSelector } from "react-redux";
import "./footer.scss";
import { Link } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { BsGithub, BsLinkedin, BsYoutube } from "react-icons/bs";

export default function Footer() {
  const siteName = useSelector((state) => state.utilSlice.siteName);
  return (
    <div className="footer">
      <div className="title">
        <h2>{siteName}</h2>
        <small>A advance AI tool for image creation.</small>
      </div>
      <div className="social-links">
        <Link target="blank" to="https://github.com/TusharSoni014">
          <BsGithub className="github icon" />
        </Link>
        <Link
          target="blank"
          to="https://www.linkedin.com/in/tushar-verma-developer/"
        >
          <BsLinkedin className="linkedin icon" />
        </Link>
        <Link target="blank" to="https://www.youtube.com/@codesoni">
          <BsYoutube className="youtube icon" />
        </Link>
        <Link target="blank" to="mailto:tusharproject00@gmail.com">
          <BiLogoGmail className="gmail icon" />
        </Link>
        
      </div>
      <a
        rel="noreferrer"
        id="verification-aitoolhunt"
        data-verify-aitoolhunt="109917868316099866825"
        href="https://www.aitoolhunt.com/tool/craftura-ai.cloud?utm_medium=featured&utm_source=craftura-ai.cloud"
        target="_blank"
      >
        <img
          width="224"
          src="https://www.aitoolhunt.com/images/featured-dark.png?a=1"
        />
      </a>
      <div className="footer-links">
        <Link to="/termsofservice">Terms of Service</Link>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/guide">Guide</Link>
      </div>
      
      <div className="footer-info">
        <small>
          This tool is made by Tushar Soni | © {new Date().getFullYear()}
        </small>
      </div>
      
    </div>
  );
}
