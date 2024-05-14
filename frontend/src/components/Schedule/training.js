import React, { useState } from "react";
import axios from "axios";
import './training.css'

function Training() {
    const [order, setOrder] = useState({

        name: "",
        email: "",
        date: "",
        time: "",
        error: "",
        r_type:"" // New state for error message
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        let error = "";

        if (name === "email") {
            // Regular expression for validating email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = "Please enter a valid email address";
            }
        }

        setOrder((prev) => ({
            ...prev,
            [name]: value,
            error: error, // Storing the error message in the state
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!order.error) {
            // Proceed only if there are no validation errors
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
        <div className="add-order">
            <h2>Training Schedule Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" id="name" name="name" onChange={handleOnChange} /><br />
                <label>Email:</label>
                <input type="text" id="email" name="email" onChange={handleOnChange} />
                {order.error && <div className="error">{order.error}</div>} {/* Display error message */}
                <br />
                <label>Date:</label>
                <input type="date" id="date" name="date" onChange={handleOnChange} /><br />
                <label>Time:</label>
                <input type="time" id="time" name="time" onChange={handleOnChange} /><br />
                <label>Request:</label>
                <input type="text" id="r_type" name="r_type" onChange={handleOnChange} /><br />
                <button>Add Details</button>
            </form><br />
        </div>
    );
}

export default Training;
