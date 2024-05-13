import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
import Image4 from "../imagefiles/supplierBg.jpg";
import Image1 from "../imagefiles/orders.png";
import Image2 from "../imagefiles/user.png";
import Image3 from "../imagefiles/notification.png";
import { useNavigate } from "react-router-dom";

const Supplier = () => {
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/supplier")
      .then((res) => {
        if (res.data.valid) {
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);
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
    
      <Container >
        <Row  style={{ marginTop: "10rem",justifyContent:"space-betweens" }}>
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
                <Card.Title>Orders</Card.Title>

                <Card.Img
                  variant="top"
                  src={Image1}
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
                <Card.Title>Notificatons</Card.Title>

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
        </Row>
      </Container>
      
      
    </div>
  );
};

export default Supplier;
