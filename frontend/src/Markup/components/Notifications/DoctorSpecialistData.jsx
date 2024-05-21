import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorSpecialistData = () => {
  const [formData, setFormData] = useState({
    reason: "",
    patient_id: null,
    doctor_id: null,
    specialist_id: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting data ...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/doctorspecialistdata/",
        formData
      );
      console.log("Response:", response.data);
      toast.success("Posted data  successfully");
      toast.dismiss(toastId);

      // Do something with the response if needed
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
      toast.dismiss(toastId);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Doctor Specialist Data</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="reason" style={styles.label}>
            Reason:
          </label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="patient_id" style={styles.label}>
            Patient ID:
          </label>
          <input
            type="number"
            id="patient_id"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="doctor_id" style={styles.label}>
            Doctor ID:
          </label>
          <input
            type="number"
            id="doctor_id"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="specialist_id" style={styles.label}>
            Specialist ID:
          </label>
          <input
            type="number"
            id="specialist_id"
            name="specialist_id"
            value={formData.specialist_id}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    borderRadius: "3px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default DoctorSpecialistData;
