import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DoctorsList.css";
import DoctorAvailable from "./DoctorAvailable";
const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [expandedBios, setExpandedBios] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/detection/customers/doctors/"
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // const handleMakeAppointment = (doctorId) => {
  //   navigate("/appointment", { state: { doctorIdK: doctorId } });
  // };

  const toggleBio = (doctorId) => {
    setExpandedBios((prevState) => ({
      ...prevState,
      [doctorId]: !prevState[doctorId],
    }));
  };

  const renderBio = (bio, doctorId) => {
    const isExpanded = expandedBios[doctorId];
    const words = bio.split(" ");
    const shouldShowSeeMore = words.length > 50;
    return (
      <div>
        <p>{isExpanded ? bio : words.slice(0, 50).join(" ") + "..."}</p>
        {shouldShowSeeMore && (
          <button
            onClick={() => toggleBio(doctorId)}
            className="see-more-button"
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h2>Here is The List of Doctors.</h2>
      <div className="doctors-container">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img
              src={`http://localhost:9000${doctor.image}`}
              alt={doctor.first_name}
              className="doctor-image"
            />
            <div>
              <h3>
                {doctor.first_name} {doctor.last_name}
              </h3>
              <p>Phone: {doctor.phone}</p>
              <p>City: {doctor.city}</p>
              <p>Gender: {doctor.gender}</p>
              Bio:{renderBio(doctor.bio, doctor.id)}
            </div>
            <br />
            {/* <DoctorAvailable doctorId={doctor.id} /> */}
            {/* <button
              className="appointment-button"
              onClick={() => handleMakeAppointment(doctor.user_id)}
            >
              Make Appointment
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
