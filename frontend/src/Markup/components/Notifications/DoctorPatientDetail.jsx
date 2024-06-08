import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DoctorPatientDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/detection/doctorpatientmessage/${id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Information About Doctor Message Detail</h2>
      {/* <table
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          border: "2px solid black",
        }}
      > */}
        {/* <tbody> */}
          {/* <tr> */}
            
            {/* <td style={{ border: "1px solid black", padding: "8px" }}> */}
              {appointment.message}
            {/* </td> */}
          {/* </tr> */}
        {/* </tbody> */}
      {/* </table> */}
    </div>
  );
};

export default DoctorPatientDetail;
