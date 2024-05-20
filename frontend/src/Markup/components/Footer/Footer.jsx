import { FaInstagram } from "react-icons/fa";
import { BsTiktok } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import logoblack from "../../../assets/img/Custom/logoblack.png";
import { IoLocationOutline } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import {
  PiBatteryVerticalLowLight,
  PiTelegramLogoDuotone,
} from "react-icons/pi";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 footer-contact">
                <div className="footer-logo">
                  <Link to="/" onClick={scrollToTop}>
                    <img src={logoblack} alt="logo" loading="lazy" />
                  </Link>
                  <h3 style={{ fontSize: "20px", marginLeft: "20px" }}>
                    <Link
                      style={{ color: "rgb(68, 68, 68)" }}
                      to="/"
                      onClick={scrollToTop}
                    >
                      BlackRock Solutions PLC
                    </Link>
                  </h3>
                </div>

                <p>
                  your Trusted Partner In <br />
                  The Pursuit Of Higher Education!
                </p>
              </div>

              <div className="col-lg-4 col-md-4">
                <h4
                  className="quick-contact"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Quick Contact
                </h4>

                <div className=" justify-content-center">
                  <div className="col-lg-10">
                    <div className="info-wrap">
                      <div style={{ marginLeft: "-5px" }} className="info">
                        <Link
                          to="https://maps.app.goo.gl/pJxB7Vs5robKsqiB7"
                          target="_blank"
                          className="col-lg-5 info"
                        >
                          <div style={{ display: "flex" }}>
                            <i
                              style={{ fontSize: "24px", marginRight: "10px" }}
                            >
                              <IoLocationOutline />
                            </i>

                            <div className="mb-md-3">
                              <h4>Location:</h4>
                              <p>
                                Ag grace building 10th floor [ Edna mall to 22
                                road ] Addis Ababa, Ethiopa
                              </p>
                            </div>
                          </div>
                        </Link>
                        <br />

                        <div className="col-lg-4 info  mt-lg-0 mb-4">
                          <div style={{ display: "flex" }}>
                            <i
                              style={{
                                fontSize: "24px",
                                marginRight: "10px",
                                marginTop: "-10px",
                              }}
                            >
                              <TfiEmail />
                            </i>
                            <div className="mb-md-3">
                              <h4>Email:</h4>
                              <Link
                                to="mailto:info@blackrocksolutionsplc.com"
                                target="_blank"
                              >
                                <p>info@blackrocksolutionsplc.com</p>
                              </Link>
                              <Link
                                to="mailto:sales@blackrocksolutionsplc.com"
                                target="_blank"
                              >
                                <p>sales@blackrocksolutionsplc.com</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 info col-md-4 mt-md-4 call mt-sm-0 footer-links">
                <div className="col-lg-3 info  mt-sm-0 mt-lg-0 mb-4 mb-lg-4 mb-md-5">
                  <Link to="tel:8828">
                    <div style={{ display: "flex" }}>
                      <i
                        style={{
                          fontSize: "24px",
                          marginRight: "10px",
                        }}
                      >
                        <PiBatteryVerticalLowLight />
                      </i>
                      <div>
                        <h4>Call:</h4>
                        <p>+8828</p>
                        <p>[works 24/7]</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  to="https://t.me/infoblackrock"
                  target="_blank"
                  className="col-lg-3 info"
                >
                  <div style={{ display: "flex" }}>
                    <i style={{ fontSize: "24px", marginRight: "10px" }}>
                      <PiTelegramLogoDuotone />
                    </i>
                    <div>
                      <h4>Telegram:</h4>
                      <p>@infoblackrock</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-lg-2 col-md-4 mt-sm-2 mt-lg-0 footer-links">
                <h4 className="" style={{ marginBottom: "20px" }}>
                  Useful Links
                </h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/" onClick={scrollToTop}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/about" onClick={scrollToTop}>
                      About us
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/countries" onClick={scrollToTop}>
                      Countries
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/exams" onClick={scrollToTop}>
                      Exam
                    </Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/blog" onClick={scrollToTop}>
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              &copy; Copyright 2024&nbsp;
              <strong>
                <span>BlackRock Solutions PLC</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by&nbsp;
              <Link onClick={scrollToTop} to="/">
                BlackRock Solutions
              </Link>
            </div>
          </div>

          <div className="header-social-links d-flex align-items-center">
            <Link
              to="https://t.me/BlackRockSolutionsplc"
              target="_blank"
              className="telegram"
            >
              <FaTelegram />
            </Link>
            <Link
              to="https://www.instagram.com/blackrocksolutionsplc/?igshid=NZZLODBKYWE4Ng%3D%3D"
              target="_blank"
              className="instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              to="https://www.tiktok.com/@blackrocksolutionsplc"
              target="_blank"
              className="tiktok"
            >
              <BsTiktok />
            </Link>
            <Link
              to="https://www.youtube.com/@BlackRockSolutionsPLC"
              target="_blank"
              className="youtube"
            >
              <IoLogoYoutube />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
