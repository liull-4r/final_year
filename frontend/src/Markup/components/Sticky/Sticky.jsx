import { useEffect, useState } from "react";
import { IoCall, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CallIcon = () => {
  const [show, handleShow] = useState(false);
  const [iconColor, setIconColor] = useState("white");

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height <= 100 || show) {
        setIconColor("#273746"); // For black background
      } else {
        setIconColor("white");
      }
    };

    handleResize();

    const scrollListener = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);

  return (
    <div className="call-icon">
      <Link to="tel:8828" className="call-fixed" target="_blank">
        <IoCall style={{ fontSize: "40px", color: iconColor }} />
        <span
          className="phone-number"
          style={{
            color: iconColor,
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Call 8828
        </span>
      </Link>
    </div>
  );
};

const ChatIcon = () => {
  const [show, handleShow] = useState(false);
  const [iconColor, setIconColor] = useState("#273746");
  const [svgColor, setSvgColor] = useState("white");

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height <= 100 || show) {
        setIconColor("#273746");
        setSvgColor("white");
      } else {
        setIconColor("white");
        setSvgColor("#273746");
      }
    };

    handleResize();

    const scrollListener = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);

  return (
    <div className="chat-icon">
      <Link
        className="chat-link"
        to="https://t.me/infoblackrock"
        target="_blank"
      >
        <div className="chat-icon-box" style={{ backgroundColor: iconColor }}>
          <IoChatbubbleEllipsesOutline color={svgColor} />
        </div>
        <span
          className="chat-text"
          style={{
            color: iconColor,
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Live Chat
        </span>
      </Link>
    </div>
  );
};

export { CallIcon, ChatIcon };
