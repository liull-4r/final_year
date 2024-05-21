import { useState } from "react";
import axios from "axios";
import "./AppointmentForm.css"; // Import custom styles
// import { useLocation } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
function AppointmentForm() {
  const [, setLoading] = useState(false); // New loading state
  // const Token = localStorage.getItem("Token");
  // const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  // const location = useLocation();
  // const { doctorIdK } = location.state;
  const [formData, setFormData] = useState({
    appointment_datetime: null,
    reason: "",
    notes: "",
  });
  // const patientId = user?.user_id; // Fixed patient ID if user is not null
  const patientId = 2; // Fixed patient ID
  const specialistId = 5; // Fixed doctor ID
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state to true when submitting

    const toastId = toast.loading("Creating Appointement ...");

    try {
      // Validate form data
      if (!formData.appointment_datetime || !formData.reason) {
        setError("All fields are required.");
        return;
      }
      // Check if patientId is null
      if (!patientId) {
        setError("Patient ID is missing.");
        return;
      }
      // Set fixed patient and doctor IDs
      formData.patient_id = patientId;
      formData.specialist_id = specialistId;
      // Assuming you have an API endpoint for creating appointments
      const response = await axios.post(
        "http://localhost:9000/detection/appointments/",
        formData
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Appointment Created successful");
        toast.dismiss(toastId); // Reset form after successful submission
        setFormData({
          appointment_datetime: null,
          reason: "",
          notes: "",
        });
      }
    } catch (error) {
      console.log("Error creating appointment:", error);
      setError("An error occurred while creating the appointment.");
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group">
          <label>Date and Time:</label>
          <input
            type="datetime-local"
            name="appointment_datetime"
            value={formData.appointment_datetime}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Reason:</label>
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Appointment
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
