import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import { StarFill, Star } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Image5 from '../imagefiles/userprofile.jpg'

const StarIcon = ({ selected, onSelect }) => {
  return (
    <span
      className={`text-xl cursor-pointer ${
        selected ? "text-yellow-500" : "text-gray-400"
      }`}
      onClick={onSelect}
    >
      {selected ? <StarFill style={{ color: "orange" }} /> : <Star />}
    </span>
  );
};

const GiveFeedbacks = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    instructor: "",
    rating: 0,
    feedback: "",
  });

  const handleStarSelect = (rating) => {
    setSelectedStars(rating);
    setFormData({
      ...formData,
      rating: rating,
    });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))["_id"];
        const response = await axios.post(
          "http://localhost:8000/api/feedbacks",
          {
            ...formData,
            name: formData.fullName,
            userId: userId,
          }
        );

        console.log(response.data);
        setFormData({
          fullName: "",
          email: "",
          instructor: "",
          rating: 0,
          feedback: "",
        });
        setSelectedStars(0);
        alert("Feedback sent successfully");
        navigate("/feedbacks");
      } catch (error) {
        console.error("Error creating feedback:", error);
      }
    } else {
      console.log("bit");
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/users`);
      const instructors = result.data["user"].filter(
        (user) => user.role === "Instructor"
      );
      setInstructors(instructors);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.instructor.trim()) {
      errors.instructor = "Instructor selection is required";
    }
    if (formData.rating === 0) {
      errors.rating = "Rating is required";
    }
    if (!formData.feedback.trim()) {
      errors.feedback = "Feedback is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div style={{ height: '100vh', backgroundImage: `url(${Image5})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',}}>
      <Container >
        <Card style={{ marginBottom: "20px" ,marginTop:"5rem",width:"600px"}}>
          <Card.Body>
            <h2 className="text-2xl text-gray-800 font-semibold mb-6" style={{ textAlign: "center" }}>
              Give your Feedback
            </h2>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="fullName">
                <Form.Label style={{ paddingLeft: "5px", paddingRight: "5px" }}>Full name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  style={{ paddingLeft: "5px", paddingRight: "5px" }}
                />
                {errors.fullName && (
                  <Form.Text className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label style={{ paddingLeft: "5px", paddingRight: "5px" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{ paddingLeft: "5px", paddingRight: "5px" }}
                />
                {errors.email && (
                  <Form.Text className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="instructor">
                <Form.Label style={{ paddingLeft: "5px", paddingRight: "5px" }}>Select your instructor</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  style={{ paddingLeft: "5px", paddingRight: "5px" }}
                >
                  <option value="">Select</option>
                  {instructors.map((instructor) => (
                    <option key={instructor._id} value={instructor._id}>
                      {instructor?.name}
                    </option>
                  ))}
                </Form.Control>
                {errors.instructor && (
                  <Form.Text className="text-red-500 text-sm mt-1">
                    {errors.instructor}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="rating">
                <Form.Label style={{ paddingLeft: "5px", paddingRight: "5px" }}>Rate your Yoga Instructor</Form.Label>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                 
                      key={index}
                      selected={index < selectedStars}
                      onSelect={() => handleStarSelect(index + 1)}
                    />
                  ))}
                </div>
                {errors.rating && (
                  <Form.Text className="text-red-500 text-sm mt-1">
                    {errors.rating}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="feedback">
                <Form.Label style={{ paddingLeft: "5px", paddingRight: "5px" }}>Your feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.feedback}
                  onChange={(e) =>
                    setFormData({ ...formData, feedback: e.target.value })
                  }
                  style={{ paddingLeft: "5px", paddingRight: "5px" }}
                />
                {errors.feedback && (
                  <Form.Text className="text-red-500 text-sm mt-1">
                    {errors.feedback}
                  </Form.Text>
                )}
              </Form.Group>

              <Row className="justify-content-between" style={{ marginTop: "20px" }}>
                <Col style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <Button type="submit" className="btn btn-primary" style={{ width: "50%" }}>
                    Submit
                  </Button>
                </Col>
                <Col style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                  <Button
                    type="reset"
                    onClick={() => {
                      setFormData({
                        fullName: "",
                        email: "",
                        instructor: "",
                        rating: 0,
                        feedback: "",
                      });
                      setSelectedStars(0);
                    }}
                    className="btn btn-secondary" style={{ width: "50%", marginLeft: "50px"}}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        </Container>
      </div>
   
  );
};

export default GiveFeedbacks;