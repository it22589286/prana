import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "../imagefiles/signin.jpg";
import "./Signin.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = data;
    try {
      await axios
        .post("/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            toast.success("login success");
            console.log(response);
            if (response.data.role === "customer") {
              navigate("/dashboard");
            } else if (response.data.role === "Instructor") {
              navigate("/instructor");
            } else if (response.data.role === "Supplier") {
              navigate("/supplier");
            } else if (response.data.role === "admin") {
              navigate("/admin");
            }

            localStorage.setItem("user", JSON.stringify(response.data));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlechange = (event) => {
    // console.log(event.target.name,event.target.value);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero" style={{ backgroundImage: `url(${Image})` }}>
      <div className="container">
        <div className="form">
          <Card
            className="shadow-lg"
            style={{
              width: "600px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
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
              <h4>Sign In</h4>
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
                  <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      onChange={handlechange}
                    />
                  </Col>
                  <Col sm={2}>
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility}
                      style={{ marginLeft: "10px" }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="btn">
                      Sign in
                    </Button>
                  </Col>
                </Form.Group>
                <br />
                <p style={{ textDecoration: "none" }}>
                  {" "}
                  <Link
                    to="/forgotPassword"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "red")}
                    onMouseLeave={(e) => (e.target.style.color = "inherit")}
                  >
                    forgot password ?
                  </Link>
                </p>
                <p>OR</p>
                <br />
                <p>
                  you do not have an account?
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                    onMouseEnter={(e) => (e.target.style.color = "red")}
                    onMouseLeave={(e) => (e.target.style.color = "inherit")}
                  >
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
