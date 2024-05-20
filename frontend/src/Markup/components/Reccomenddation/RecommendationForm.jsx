import { useState } from "react";
import axios from "axios";
import "./RecommendationForm.css";
import { toast } from "react-toastify";

const RecommendationForm = () => {
  const [formData, setFormData] = useState({
    recommendation: "",
    doctor: "",
    user: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Posting Recommendation ...");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/detection/info/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      toast.success("Recommendation Posted successful");
      toast.dismiss(toastId);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Posting Recommendation Failed Please Try Again");
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recommendation">Recommendation:</label>
          <textarea
            id="recommendation"
            name="recommendation"
            value={formData.recommendation}
            onChange={handleChange}
            rows="4"
          />
        </div>
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
          <label htmlFor="user">User:</label>
          <input
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecommendationForm;
