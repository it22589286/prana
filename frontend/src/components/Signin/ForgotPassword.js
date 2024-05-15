import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "../imagefiles/password.jpg";
import "./Signin.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email } = data;
    try {
      await axios
        .post("/forgot-password", {
          email,
        })
        .then((response) => {
          navigate("/signin");
        });
    } catch (error) {}
  };

  const handlechange = (event) => {
    // console.log(event.target.name,event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
    style={{
      height: "100vh",
      backgroundImage: `url(${Image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <Container>
          <Card
            className="shadow-lg"
            style={{
              width: "600px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              marginTop: "100px",
            }}
          >
            <Card.Header
              className="mb-3"
              style={{
                backgroundColor: "orange",
                height: "60px",
                textAlign: "center",
              }}
            >
              <h4>Forgot Password</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="btn">
                      Reset Password
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          </Container>
    </div>
  );
};

export default ForgotPassword;
