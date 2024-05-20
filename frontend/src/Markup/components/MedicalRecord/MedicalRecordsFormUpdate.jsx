import  { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./MedicalRecordsForm.css"; // Custom CSS

const MedicalRecordsFormUpdate = () => {
  const [formData, setFormData] = useState({
    weight: null,
    systolic_blood_pressure: null,
    diastolic_blood_pressure: null,
    blood_sugar_level: null,
    heart_rate: null,
    cholesterol_level: null,
    doctor_notes: "",
    doctor: null,
    patient: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:9000/detection/medicalrecords/?patient_id=2")
      .then((response) => {
        if (response.data.length > 0) {
          setFormData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the medical records!",
          error
        );
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("updating data in...");
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:9000/detection/medicalrecords/?patient_id=2",
        formData
      );
      console.log("Data updated successfully!", response);
      toast.success("Data updated successfully!");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("There was an error updating the data!", error);
      toast.error("Error updating data. Please try again later.");
      toast.dismiss(toastId);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ marginTop: "100px" }}
    >
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Weight:</label>
          <input
            type="number"
            className="form-control"
            name="weight"
            value={formData.weight || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Systolic Blood Pressure:</label>
          <input
            type="number"
            className="form-control"
            name="systolic_blood_pressure"
            value={formData.systolic_blood_pressure || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Diastolic Blood Pressure:</label>
          <input
            type="number"
            className="form-control"
            name="diastolic_blood_pressure"
            value={formData.diastolic_blood_pressure || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Blood Sugar Level:</label>
          <input
            type="number"
            className="form-control"
            name="blood_sugar_level"
            value={formData.blood_sugar_level || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Heart Rate:</label>
          <input
            type="number"
            className="form-control"
            name="heart_rate"
            value={formData.heart_rate || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Cholesterol Level:</label>
          <input
            type="number"
            className="form-control"
            name="cholesterol_level"
            value={formData.cholesterol_level || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <label>Doctor Notes:</label>
        <textarea
          className="form-control"
          name="doctor_notes"
          value={formData.doctor_notes}
          onChange={handleChange}
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <label>Doctor:</label>
          <input
            type="text"
            className="form-control"
            name="doctor"
            value={formData.doctor || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label>Patient:</label>
          <input
            type="text"
            className="form-control"
            name="patient"
            value={formData.patient || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default MedicalRecordsFormUpdate;
