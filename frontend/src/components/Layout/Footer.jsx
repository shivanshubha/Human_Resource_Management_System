// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved BY twosidefact. </div>
      <div>
        <Link
          to={"/https://www.facebook.com/shivanshu.bharti.121"}
          target="_blank"
        >
          <FaFacebook />
        </Link>
        <Link
          to={"/https://www.youtube.com/channel/UClIVGrwUM6_Rxt-h7lXIDmA"}
          target="_blank"
        >
          {" "}
          <FaYoutube />
        </Link>
        <Link
          to={"/https://www.linkedin.com/in/shivanshu-bharti192/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link
          to={"/https://www.instagram.com/shivanshu_bharti_1/"}
          target="_blank"
        >
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
