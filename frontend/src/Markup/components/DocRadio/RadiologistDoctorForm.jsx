import { useState } from "react";
import axios from "axios";
import "./RadiologistDoctorForm.css";
import { toast } from "react-toastify";

const RadiologistDoctorForm = () => {
  const [formData, setFormData] = useState({
    doctor: "",
    patient: "",
    radiologist: "",
    prediction: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting data Please Wait...");
    e.preventDefault();
    const data = new FormData();
    data.append("doctor", formData.doctor);
    data.append("patient", formData.patient);
    data.append("radiologist", formData.radiologist);
    data.append("prediction", formData.prediction);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:9000/detection/radiologistdoctor/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
          <label htmlFor="doctor">Doctor:</label>
          <input
            type="text"
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="patient">Patient:</label>
          <input
            type="text"
            id="patient"
            name="patient"
            value={formData.patient}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="radiologist">Radiologist:</label>
          <input
            type="text"
            id="radiologist"
            name="radiologist"
            value={formData.radiologist}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prediction">Prediction:</label>
          <textarea
            id="prediction"
            name="prediction"
            value={formData.prediction}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RadiologistDoctorForm;
