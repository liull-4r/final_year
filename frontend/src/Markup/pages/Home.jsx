// import AboutPart from "../components/AboutPart/AboutPart";
import Contact from "../components/Contact/Contact";
import Faq from "../components/Faq/Faq";
import HeroSection from "../components/HeroSection/HeroSection";
import Values from "../components/Values/Values";
import Videosection from "../components/VideoSection/Videosection";
import WhySection from "../components/WhySection/WhySection";
import BackToTopButton from "../components/BackToTop/BackToTop";
import ApplyNow from "../components/ApplyNow/ApplyNow";
import { CallIcon, ChatIcon } from "../components/Sticky/Sticky";
// import ThemeProvider from "../../theme";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
// import SubNewsletter from "../components/SubNewsletter/SubNewsletter";

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>Blackrock Solutions</title>
        <meta
          name="description"
          content="BlackRock Solutions PLC: Top study abroad consultancy in Ethiopia. Expert guidance for studying in Canada, USA, UK, Dubai, China, and Italy."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <HeroSection />
      <ApplyNow />
      <Values />
      <WhySection />
      <Videosection />
      <Faq />
      <Contact />
      <CallIcon />
      <ChatIcon />
      <BackToTopButton />
    </>
  );
}

export default Home;
