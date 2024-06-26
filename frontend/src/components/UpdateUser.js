import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Image5 from "./imagefiles/userprofile.jpg";
import { toast } from "react-hot-toast";

const UpdateUser = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const id = userData["_id"];
  const [user, setUser] = useState({
    email: "",
    nic: "",
    name: "",
    password: "",
    number: "",
    role: "",
    gender: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/getUser/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error();
      }
    };

    fetchUser();
  }, [id]);

  const handlechange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    console.log(user);
    event.preventDefault();
    try {
      const response = await axios.put(`/update/${id}`, {
        name: String(user.name),
        email: String(user.email),
        nic: String(user.nic),
        number: String(user.number),
        password: String(user.password),
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("profile updated successfully");
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${Image5})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{
            width: "36rem",
            height: "30rem",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {user && <p>{user.name}`s Profile</p>}{" "}
            </Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group  as={Row} className="mb-3">
              <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handlechange}
                  value={user.email}
                  disabled
                />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={2}>
                    NIC
                  </Form.Label>
                  <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter nic"
                  name="nic"
                  onChange={handlechange}
                  value={user.nic}
                />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={2}>
                    Name
                  </Form.Label>
                  <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  onChange={handlechange}
                  value={user.name}
                />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={2}>
                    Password
                  </Form.Label>
                  <Col sm={10}>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handlechange}
                  value={user.password}
                />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={2}>
                    Number
                  </Form.Label>
                  <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Enter Contact Number"
                  name="number"
                  onChange={handlechange}
                  value={user.number}
                />
                </Col>
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Select
                    defaultValue="Choose..."
                    name="role"
                    onChange={handlechange}
                    value={user.role}
                    disabled
                  >
                    <option>Role</option>
                    <option value="customer">customer</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Supplier">Supplier</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Select
                    defaultValue="Choose..."
                    name="gender"
                    onChange={handlechange}
                    value={user.gender}
                    disabled
                  >
                    <option>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <div className="d-flex  flex-column ">
                <Button
                  variant="primary"
                  type="submit"
                  className="flex-grow-1 mx-2 "
                >
                  update
                </Button>
              </div>
              <br />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UpdateUser;
