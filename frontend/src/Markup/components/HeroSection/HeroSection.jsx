import { Link } from "react-router-dom";
import { Box, Button, Typography, Grid } from "@mui/material";
function HeroSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <Box>
      <section
        id="hero"
        className="d-flex align-items-center container-fluid justify-content-center"
      >
        <Box className="container" data-aos="fade-up" sx={{ width: "90vw" }}>
          <Grid container spacing={10} textAlign="center">
            <Grid
              className="hero-text"
              item
              xs={12}
              sx={{ marginBottom: { xs: 0, sm: 10 } }}
            >
              <Typography variant="h1" sx={{ fontSize: "3rem" }}>
                Hey!
              </Typography>
              <Typography variant="h2" sx={{ fontSize: "2rem" }}>
                <span>Finally</span>, You came to the right place. How you
                Doing?
              </Typography>
            </Grid>
            <Grid
              item
              className="hero-btn"
              xs={11}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "7rem",
              }}
            >
              <Button
                onClick={scrollToTop}
                component={Link}
                to="/register"
                variant="contained"
                className="btn-create-account"
                sx={{ margin: "0 5vw" }}
              >
                Sign Up
              </Button>
              <Button
                onClick={scrollToTop}
                component={Link}
                to="/login"
                variant="outlined"
                className="btn-apply-now"
                sx={{ margin: "0 5vw" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </section>
    </Box>
  );
}

export default HeroSection;
