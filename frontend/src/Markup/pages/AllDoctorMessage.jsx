import { Link } from "react-router-dom";

function AllDoctorMessage() {
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
          <Link className="nav-link scrollto" to="/specialists">
            Request
          </Link>
        </li>
      </button>
      <button>
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/searchformessage">
            Send Message
          </Link>
        </li>
      </button>
      <button style={{ marginTop: "20px", marginBottom: "20px" }}>
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/searchforrecommendation">
            Add Recommendation
          </Link>
        </li>
      </button>
    </div>
  );
}

export default AllDoctorMessage;
