import { Link } from "react-router-dom";

function AllDoctorRecord() {
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
          <Link className="nav-link scrollto" to="/search">
            Add Record
          </Link>
        </li>
      </button>

      <button>
        <li style={{ listStyleType: "none" }} className="link">
          <Link className="nav-link scrollto" to="/searchforupdate">
            Update Record
          </Link>
        </li>
      </button>
    </div>
  );
}

export default AllDoctorRecord;
