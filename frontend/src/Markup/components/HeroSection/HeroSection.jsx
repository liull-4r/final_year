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
          <Grid container spacing={10}>
            <Grid
              className="hero-text"
              item
              xs={12}
              sx={{ marginBottom: { xs: 0, sm: 10 } }}
            >
              <Typography variant="h1" sx={{ fontSize: "3rem" }}>
                "Empowering Health"
              </Typography>
              <Typography variant="h2" sx={{ fontSize: "3rem" }}>
                <span>Through</span>, Technology
              </Typography>
              <Typography variant="p" sx={{ fontSize: "1rem", color: "white" }}>
                <span>Advanced</span>, Brain Tumor Detection
              </Typography>
            </Grid>
            <Grid
              item
              className="hero-btn"
              xs={8}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "7rem",
              }}
            >
              <Button
                onClick={scrollToTop}
                component={Link}
                to="/login"
                variant="contained"
                className="btn-create-account"
                sx={{
                  margin: "0",
                  fontSize: "10px", // Decrease the font size
                  textTransform: "none", // Remove uppercase transformation
                  "& .MuiButton-label": {
                    textTransform: "capitalize", // Capitalize the first letter of each word
                  },
                }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Box>
      </section>
    </Box>
  );
}

export default HeroSection;
