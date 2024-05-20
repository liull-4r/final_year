import { Link } from "react-router-dom";
import about from "../../../assets/img/Custom/about.jpg";
import { FaArrowRightLong } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
function AboutPart() {
  return (
    <div>
      <Helmet>
        <title>About Us</title>
        <meta
          name="description"
          content="Black Rock Solutions: Your gateway to higher education abroad. Expert consultancy for scholarships, study programs in USA, Europe, and Asia. Achieve your goals!"
        />
        <link rel="canonical" href="/about" />
      </Helmet>
      <br />

      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="content">
                <h1>About Us</h1>

                <p>
                  Black Rock Solutions is a leading educational consultancy that
                  helps students pursue higher education abroad. We focus on
                  scholarships and study abroad programs in the USA, Europe, and
                  Asia. We offer various services to assist students with
                  applying to foreign universities. Our experienced consultants
                  understand the challenges and opportunities of studying
                  abroad, and provide personalized support and guidance to
                  students. Whether you're a high school, college, or working
                  student, Black Rock Solutions can help you achieve your
                  academic and professional goals.
                </p>
                <div className="text-center text-lg-start">
                  <Link
                    to="https://www.tiktok.com/@blackrocksolutionsplc"
                    target="_blank"
                    className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    Read More
                    <i>
                      <FaArrowRightLong />
                    </i>
                  </Link>
                 
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 d-flex align-items-center"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <img loading="lazy" src={about} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPart;
