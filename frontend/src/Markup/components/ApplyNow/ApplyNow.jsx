import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

function ApplyNow() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section id="what-we-do" className="what-we-do">
      <div className="container" data-aos="zoom-out-right">
        <div className="section-title">
          <Typography
            style={{ fontFamily: "Poppins, sans-serif" }}
            variant="h3"
            sx={{
              margin: 2,
              fontSize: isDesktop ? "2.5rem" : "1.5rem", // Adjust font size based on screen size
            }}
          >
            Don't give up on your dreams Just
          </Typography>
          <div className="text-center text-lg-start">
            <Link
              to="/register"
              onClick={scrollToTop}
              className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
            >
              <span>APPLY NOW!</span>
              <i>
                <FaArrowRightLong />
              </i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplyNow;
