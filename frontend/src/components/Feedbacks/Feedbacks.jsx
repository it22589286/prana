import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useReactToPrint } from 'react-to-print';

const Feedbacks = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedbacks");
      setFeedbacks(response.data.feedbacks);
    } catch (err) {
      console.error("Error fetching feedbacks: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'Feedbacks Report',
    onAfterPrint: () => alert('Feedbacks Report Printed Successfully!')
  });

  const approveFeedback = (id) => {
    // Logic to approve feedback with given id
    console.log("Feedback with ID", id, "approved!");
  };

  const deleteFeedback = (id) => {
    // Logic to delete feedback with given id
    console.log("Feedback with ID", id, "deleted!");
  };

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ minHeight: "80vh", padding: 32 }} ref={ComponentsRef}>
      <h1>Feedbacks</h1>
      <Form.Group as={Row} className="mb-3" controlId="searchText">
        <Form.Label column sm="2">
          Search by Reviewer's Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
      </Form.Group>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Reviewer's Name</th>
              <th>Reviewer's Email</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.feedback}</td>
                <td style={{ display: "flex" }}> {/* Style added */}
                  <Button variant="success" onClick={() => approveFeedback(feedback.id)}>Approve</Button> {/* Approve button */}
                  <Button variant="danger" onClick={() => deleteFeedback(feedback.id)} style={{ marginLeft: "5px" }}>Delete</Button> {/* Delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button variant="primary" onClick={handlePrint}>
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default Feedbacks;
