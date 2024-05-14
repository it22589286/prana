import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const MyFeedbacks = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [rating, setRating] = useState(0); // State to manage the rating
  const navigate = useNavigate();
  const formRef = useRef();

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedbacks");
      const id = JSON.parse(localStorage.getItem("user"))["_id"];
      setFeedbacks(
        response.data.feedbacks.filter((feedback) => {
          return feedback.userId === id;
        })
      );
    } catch (err) {
      console.error("Error fetching feedbacks: ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/feedbacks/${id}`);
      await fetchFeedbacks();
      alert("Feedback deleted successfully");
    } catch (err) {
      alert("Failed to delete feedback");
    }
  };

  const fetchInstructors = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/users`);
      const instructors = result.data["user"].filter(
        (user) => user.role === "Instructor"
      );
      setInstructors(instructors);
    } catch (error) {}
  };

  const showEditModal = (feedback) => {
    setCurrentFeedback(feedback);
    setRating(feedback.rating); // Initialize the rating state
    setIsModalVisible(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const values = Object.fromEntries(formData.entries());

    try {
      await axios.put(
       `http://localhost:8000/api/feedbacks/${currentFeedback._id}`,
        { ...values, rating }
      );
      await fetchFeedbacks();
      setIsModalVisible(false);
      alert("Feedback updated successfully");
    } catch (err) {
      alert("Failed to update feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchInstructors();
  }, []);

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<StarFill key={i} style={{ color: "orange" }}  />);
    }
    return stars;
  };

  return (
    <div style={{ minHeight: "80vh", padding: 32 }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Row xs={1} md={3} className="g-4" >
          {feedbacks.map((feedback) => (
            <Col key={feedback._id} style={{marginRight:"-150px"}}>
              <Card style={{ width: '18rem'}}>
                <Card.Body>
                  <Card.Title>{`Instructor: ${feedback.instructor?.name}`}</Card.Title>
                  <Card.Text style={{ textAlign: "left" }}>
                    Feedback: {feedback.feedback}
                  </Card.Text>
                  <Card.Text style={{ textAlign: "left" }}>
                    <div>
                      Rating: {renderStarRating(feedback.rating)}
                    </div>
                  </Card.Text>
                  <div style={{ marginLeft: "-90px" }}>
                    <Col>
                      <Button variant="primary" onClick={() => showEditModal(feedback)} style={{ width: "100px", marginBottom: "5px" }}>
                        Edit
                      </Button>
                    </Col>
                    <Col>
                      <Button variant="danger" onClick={() => deleteFeedback(feedback._id)} style={{ width: "100px" }}>
                        Delete
                      </Button>
                    </Col>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="Edit Feedback"
        show={isModalVisible}
        onHide={() => setIsModalVisible(false)}
      >
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleEdit}>
            <Form.Group controlId="instructor">
              <Form.Label>Instructor</Form.Label>
              <Form.Control as="select" name="instructor" placeholder="Select an instructor">
                {instructors.map((instructor) => (
                  <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="feedback">
              <Form.Label>Feedback</Form.Label>
              <Form.Control type="text" name="feedback" defaultValue={currentFeedback?.feedback} />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <div>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => setRating(index + 1)} // Update the rating state
                  >
                    {index < rating ? <StarFill style={{ color: "orange" }} /> : <StarFill />}
                  </span>
                ))}
              </div>
              <Form.Control type="hidden" name="rating" value={rating} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyFeedbacks;