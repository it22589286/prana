import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Badge } from "react-bootstrap";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [instructorAverages, setInstructorAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedbacks");
      setFeedbacks(response.data.feedbacks);
      calculateAverageRatings(response.data.feedbacks);
    } catch (err) {
      console.error("Error fetching feedbacks: ", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRatings = (feedbacks) => {
    const ratings = {};
    feedbacks.forEach((feedback) => {
      const instructorId = feedback.instructor._id;
      ratings[instructorId] = ratings[instructorId] || [];
      ratings[instructorId].push(feedback.rating);
    });

    const averages = Object.keys(ratings).map((id) => {
      const average =
        ratings[id].reduce((acc, curr) => acc + curr, 0) / ratings[id].length;
      return {
        instructorId: id,
        name: feedbacks.find((f) => f.instructor._id === id).instructor.name,
        averageRating: average.toFixed(1),
      };
    });

    setInstructorAverages(averages);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Feedbacks</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Reviewer's Name</th>
            <th>Reviewer's Email</th>
            <th>Rating</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>
                <Badge variant="primary">{feedback.rating}</Badge>
              </td>
              <td>{feedback.feedback}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Instructor Average Ratings</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Instructor Name</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {instructorAverages.map((instructor) => (
            <tr key={instructor.instructorId}>
              <td>{instructor.name}</td>
              <td>
                <Badge variant="success">{instructor.averageRating}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Feedback;