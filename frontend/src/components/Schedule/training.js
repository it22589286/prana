import React, { useState } from "react";
import axios from "axios";
import './training.css'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Training() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        r_type: ""
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        if (name === "date") {
           
            const selectedDate = new Date(value);
            const currentDate = new Date();
            const error = selectedDate <= currentDate ? "Date must be in the future" : "";
            setOrder(prev => ({ ...prev, [name]: value, error: error }));
        } else {
            setOrder(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!order.error) {
            try {
                const response = await axios.post("http://localhost:8000/api/training/create_training", order);
                console.log(response);
                alert("Details added successfully!");
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="body-background"> {/* Apply the background image class here */}
            <div className="add-order">
                <h2>Training Schedule Form</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input type="text" id="name" name="name" onChange={handleOnChange} /><br />
                    <label>Email:</label>
                    <input type="text" id="email" name="email" onChange={handleOnChange} /><br />
                    <label>Date:</label>
                    <input type="date" id="date" name="date" onChange={handleOnChange} />
                    {order.error && <div className="error">{order.error}</div>}
                    <br />
                    <label>Time:</label>
                    <input type="time" id="time" name="time" onChange={handleOnChange} /><br />
                    <label>Request:</label>
                    <input type="text" id="r_type" name="r_type" onChange={handleOnChange} /><br />
                    <button>Add Details</button>
                </form><br />
               
            </div>
            <Button variant="primary" style={{ marginLeft: "102px" }}  onClick={() => navigate("/trainingdetails")}>Training Details
                </Button>
        </div>
    );
}

export default Training;
