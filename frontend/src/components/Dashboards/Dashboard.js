import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import Image4 from "../imagefiles/dashboard.jpg";
import Image1 from "../imagefiles/feedback.png";
import Image2 from "../imagefiles/user.png";
import Image3 from "../imagefiles/payment.png";
import Image5 from "../imagefiles/notification.png";
import Image6 from "../imagefiles/schedule.png";
import Image7 from "../imagefiles/package.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState();
  useEffect(() => {
    axios
      .get("/dashboard")
      .then((res) => {
        if (res.data.valid) {
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${Image4})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
     

      <Container>
        <Row className="justify-content-center"  style={{ marginTop: "5rem" }}>
          <Col md={4}>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "rgba(139, 190, 227, 0.7)",
                color: "white",
                height: "200px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body className="text-center">
                <Card.Title>Profile</Card.Title>

                <Card.Img
                  variant="top"
                  src={Image2}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                />

                <Button
                  style={{ marginLeft: "102px" }}
                  variant="primary"
                  onClick={() => navigate("/user")}
                >
                  Go{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "rgba(139, 190, 227, 0.7)",
                color: "white",
                height: "200px",
              }}
            >
              <Card.Body className="text-center">
                <Card.Title>Package</Card.Title>

                <Card.Img
                  variant="top"
                  src={Image7}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                />

                <Button variant="primary" style={{ marginLeft: "102px" }}>
                  Go{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "rgba(139, 190, 227, 0.7)",
                color: "white",
                height: "200px",
              }}
            >
              <Card.Body className="text-center">
                <Card.Title>Schedule</Card.Title>

                <Card.Img
                  variant="top"
                  src={Image6}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                />

                <Button variant="primary" style={{ marginLeft: "102px" }}>
                  Go{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container style={{ marginTop: "5rem" }}>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "rgba(139, 190, 227, 0.7)",
                color: "white",
                height: "200px",
              }}
            >
              <Card.Body className="text-center">
                <Card.Title>Notifications</Card.Title>

                <Card.Img
                  variant="top"
                  src={Image5}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                />

                <Button variant="primary" style={{ marginLeft: "102px" }}>
                  Go{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "rgba(139, 190, 227, 0.7)",
                color: "white",
                height: "200px",
              }}
            >
              <Card.Body className="text-center">
                <Card.Title>Payments</Card.Title>

                <Card.Img
                  variant="top"
                  src={Image3}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                />
                <Button variant="primary" style={{ marginLeft: "102px" }}>
                  Go{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{
                width: "18rem",
                backgroundColor: "rgba(139, 190, 227, 0.7)",
                color: "white",
                height: "200px",
              }}
            >
              <Card.Body className="text-center">
                <Card.Title>Feedbacks</Card.Title>

                <Card.Img
                  variant="top"
                  src={Image1}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                />

                <Button variant="primary" style={{ marginLeft: "102px" }}  onClick={() => navigate("/addfeedback")}>
                  Go{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
