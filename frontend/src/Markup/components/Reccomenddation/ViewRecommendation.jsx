import { useEffect, useState } from "react";
import axios from "axios";

const ViewRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("Token");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    // Make a GET request to the API endpoint
    axios
      .get("http://localhost:9000/detection/info/me/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      .then((response) => {
        // Update the state with the fetched recommendations
        setRecommendations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch recommendations");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(recommendations);
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Recommendations</h1>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>
            <p>
              <strong>Recommendation:</strong> {recommendation?.recommendation}
            </p>
            <p>
              <strong>Doctor ID:</strong> {recommendation?.doctor}
            </p>
            <p>
              <strong>User ID:</strong> {recommendation?.user}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRecommendation;
