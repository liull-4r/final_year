import logoblack from "../../../assets/img/Custom/logoblack.png";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import loginService from "../../../Services/login.service";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
function SpecialistHeader() {
  // const navigate = useNavigate();
  const logOut = () => {
    loginService.Logout();
    setIsLogged(false);
    window.location.replace("/");
  };
  const { isLogged, setIsLogged } = useAuth();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const closeMenu = () => setShow(false);

  const handleLinkClick = () => {
    closeMenu();
    scrollToTop();
  };

  const navbarClassName = show
    ? "navbar-mobile"
    : "navbar order-last order-lg-0";

  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center">
        <div className="logo me-auto mt-1 d-flex align-items-center">
          <Link onClick={scrollToTop} to="/">
            <img src={logoblack} alt="logo" loading="lazy" />
          </Link>
          <Link
            onClick={scrollToTop}
            className="logotext"
            style={{
              color: "rgb(39, 55, 70)",
              fontWeight: "600",
              marginLeft: "10px",
            }}
            to="/"
          >
            TUMOR TRACK
          </Link>
        </div>

        <nav id="navbar" className={navbarClassName}>
          <ul className="header">
            <IoCloseSharp onClick={handleShow} className="mobile-nav-toggle" />

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/service"
              >
                Service
              </Link>
            </li>
            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/specialistdoctorresponse"
              >
                Response to Doctor
              </Link>
            </li>
            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/doctorspecialistnotification"
              >
                Notifications
              </Link>
            </li>
            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/scan"
              >
                Scan
              </Link>
            </li>

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/resources"
              >
                Resources
              </Link>
            </li>
            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/appointment"
              >
                Make Appointement
              </Link>
            </li>

            <li className="link">
              <Link
                onClick={handleLinkClick}
                className="nav-link scrollto"
                to="/contact"
              >
                Contact
              </Link>
            </li>
            {isLogged ? (
              <li>
                <Link
                  onClick={handleLinkClick}
                  className="nav-link scrollto"
                  to="/profile"
                >
                  <button className="btn btn-primary">Profile</button>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  onClick={handleLinkClick}
                  className="nav-link scrollto"
                  to="/register"
                >
                  <button className="btn btn-primary">Sign Up</button>
                </Link>
              </li>
            )}
            {isLogged ? (
              <li>
                <Link
                  onClick={() => {
                    handleLinkClick();
                    logOut();
                  }}
                  className="nav-link scrollto"
                  to="/"
                >
                  <button className="btn btn-primary">Logout</button>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  onClick={handleLinkClick}
                  className="nav-link scrollto"
                  to="/login"
                >
                  <button className="btn btn-primary">Login</button>
                </Link>
              </li>
            )}
          </ul>
          <IoIosMenu onClick={handleShow} className="mobile-nav-toggle" />
        </nav>
      </div>
    </header>
  );
}

export default SpecialistHeader;
