import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button, Col } from 'react-bootstrap';

const LeaveForm = () => {
  const [empID, setEmpID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [validated, setValidated] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState('');
  const [loggedInUserName, setloggedInUserName] = useState('');

  useEffect(() => {
    // Fetch user ID from local storage when component mounts
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setLoggedInUserId(userData["_id"]);
      setloggedInUserName(userData["name"])

    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        const newLeave = { empID: loggedInUserName, startDate, endDate, leaveType };
        await axios.post('http://localhost:8000/api/leave/create', newLeave);
        alert('Leave Request Submitted');
        window.location.href = '/applyleavedashboard';
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEmpID('');
    setStartDate('');
    setEndDate('');
    setLeaveType('');
    setValidated(false);
    window.location.href = '/applyleavedashboard';
  };

  return (
    <div style={{ marginTop: '-50px' }}>
      <div className="hero">
        <div className="container">
          <div className="form">
            <Card className="shadow-lg">
              <Card.Header
                className="mb-3"
                style={{ backgroundColor: "orange", height: "60px" }}
              >
                <h4>Leave Application Form</h4>
              </Card.Header>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="empID">
                    <Form.Label>Employee Name:</Form.Label>
                    <Form.Control
                      type="text"
                      name="empID"
                      value={loggedInUserName}
                      readOnly // This prevents users from editing this field
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter Employee Name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="startDate">
  <Form.Label>Start Date:</Form.Label>
  <Form.Control
    type="date"
    name="startDate"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    min={new Date().toISOString().split('T')[0]} // Set minimum date to today
    required
  />
  <Form.Control.Feedback type="invalid">
    Please enter Start Date.
  </Form.Control.Feedback>
</Form.Group>

<Form.Group className="mb-3" controlId="endDate">
  <Form.Label>End Date:</Form.Label>
  <Form.Control
    type="date"
    name="endDate"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    min={startDate} // Set minimum date to start date
    required
  />
  <Form.Control.Feedback type="invalid">
    Please enter End Date.
  </Form.Control.Feedback>
</Form.Group>


                  <Form.Group as={Col} className="mb-3" controlId="leaveType">
                    <Form.Label>Leave Type:</Form.Label>
                    <Form.Select
                      name="leaveType"
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      required
                    >
                      <option value="">Select Leave Type</option>
                      <option value="Annual">Annual Leave</option>
                      <option value="Sick">Sick Leave</option>
                      <option value="Unpaid">Unpaid Leave</option>
                      <option value="Maternity">Maternity Leave</option>
                      <option value="Paternity">Paternity Leave</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select Leave Type.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>

                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
