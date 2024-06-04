import { Link } from "react-router-dom";

function AllDoctorNotification() {
  return (
    <div
      style={{
        marginTop: "100px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <button style={{ marginTop: "20px", marginBottom: "20px" }}>
        <li style={{ listStyleType: "none" }} className="link">
          <Link
            className="nav-link scrollto"
            to="/specialistdoctornotification"
          >
            Specialist Notifications
          </Link>
        </li>
      </button>

      <button>
        <li style={{ listStyleType: "none" }} className="link">
          <Link
            className="nav-link scrollto"
            to="/radiologistdoctornotification"
          >
            Radiologist Notifications
          </Link>
        </li>
      </button>
    </div>
  );
}

export default AllDoctorNotification;
