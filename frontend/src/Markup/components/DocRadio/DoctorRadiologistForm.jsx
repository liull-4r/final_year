import { useState } from "react";
import axios from "axios";
import "./DoctorRadiologistForm.css";
import { toast } from "react-toastify";

const DoctorRadiologistForm = () => {
  const [formData, setFormData] = useState({
    reason: "",
    notes: "",
    patient_id: "",
    doctor_id: "",
    radiologist_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting data Please Wait...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/doctorradiologist/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      toast.success("Posted successfully");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error has occurred. Please try again later.");
      toast.dismiss(toastId);
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="patient_id">Patient ID:</label>
          <input
            type="text"
            id="patient_id"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctor_id">Doctor ID:</label>
          <input
            type="text"
            id="doctor_id"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="radiologist_id">Radiologist ID:</label>
          <input
            type="text"
            id="radiologist_id"
            name="radiologist_id"
            value={formData.radiologist_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DoctorRadiologistForm;
