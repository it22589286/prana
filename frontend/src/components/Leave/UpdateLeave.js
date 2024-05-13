import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

const UpdateLeave = () => {
    const [empID, setEmpID] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        const leaveID = window.location.pathname.split('/')[2];
        axios.get(`http://localhost:8000/api/leave/get/${leaveID}`)
            .then((res) => {
                setEmpID(res.data.empID);
                setStartDate(formatDate(res.data.startDate)); // Format date before setting
                setEndDate(formatDate(res.data.endDate)); // Format date before setting
                setLeaveType(res.data.leaveType);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // Function to format date in YYYY-MM-DD format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleDateUpdate = (e) => {
        e.preventDefault();
        const leaveID = window.location.pathname.split('/')[2];
        axios.put(`http://localhost:8000/api/leave/update/${leaveID}`, {
            startDate,
            endDate,
            status: 'Updated',
        })
            .then((res) => {
                alert('Leave Request Updated');
                window.location.href = '/leaverequests';
            })
            .catch((err) => {
                console.error('Error updating date fields:', err);
                // Handle error, show error message, etc.
            });

    };

    

    return (
        <div>
            <h1>Update Leave Request</h1>
            <div className='hero'>
                <div className='container'>
                    <div className='form'>
                        <Card className="shadow-lg">
                            <Card.Header
                                className="mb-3"
                                style={{ backgroundColor: "orange", height: "60px" }}
                            >
                                <h4>Leave Application Update</h4>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleDateUpdate}>
                                    <Form.Group className='mb-3' controlId='empID'>
                                        <Form.Label>Employee ID:</Form.Label>
                                        <Form.Control type='text' value={empID} readOnly />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='startDate'>
                                        <Form.Label>Start Date:</Form.Label>
                                        <Form.Control type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='endDate'>
                                        <Form.Label>End Date:</Form.Label>
                                        <Form.Control type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className='mb-3' controlId='leaveType'>
                                        <Form.Label>Leave Type:</Form.Label>
                                        <Form.Control type='text' value={leaveType} readOnly />
                                    </Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Update
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateLeave;
