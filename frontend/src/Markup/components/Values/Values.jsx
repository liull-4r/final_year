import { PiStudentBold } from "react-icons/pi";
import { MdOutlineHandshake } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
function Values() {
  return (
    <section id="values" className="values">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div className="box">
              <i>
                {" "}
                <RiTeamLine />
              </i>
              <h3>Efficent Process</h3>
              {/* <p>
                Our team consists of seasoned experts who bring years of
                experience and wisdom to every project.
              </p> */}
            </div>
          </div>

          <div
            className="col-lg-4 mt-4 mt-lg-0"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="box">
              <i>
                <PiStudentBold />
              </i>
              <h3>Empowering Patient</h3>
              {/* <p>
                We prioritize students at the heart of everything we do,
                ensuring their needs are met with excellence.
              </p> */}
            </div>
          </div>

          <div
            className="col-lg-4 mt-4 mt-lg-0"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="box">
              <i>
                <MdOutlineHandshake />
              </i>
              <h3>Accessible Care</h3>
              {/* <p>
                Our commitment to integrity and reliability makes us a trusted
                partner you can rely on without hesitation.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Values;
