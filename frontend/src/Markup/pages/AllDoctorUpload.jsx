import { Link } from "react-router-dom";

function AllDoctorUpload() {
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
          <Link className="nav-link scrollto" to="/radiologistlists">
            Upload to Radiologist
          </Link>
        </li>
      </button>

      <button>
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/posttospecialistdata">
            Upload to Specialist
          </Link>
        </li>
      </button>
    </div>
  );
}

export default AllDoctorUpload;
