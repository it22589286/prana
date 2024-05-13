import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Button, Col } from 'react-bootstrap';

const LeaveForm = () => {
  const [empID, setEmpID] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        const newLeave = { empID, startDate, endDate, leaveType };
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
  };

  return (
    <div>
      <h1>Leave Application Form</h1>
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
                    <Form.Label>Employee ID:</Form.Label>
                    <Form.Control
                      type="text"
                      name="empID"
                      value={empID}
                      onChange={(e) => setEmpID(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter Employee ID.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="startDate">
                    <Form.Label>Start Date:</Form.Label>
                    <Form.Control
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
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