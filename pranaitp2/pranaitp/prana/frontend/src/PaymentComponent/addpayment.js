import { useState } from "react";
import axios from "axios";
import './addorder.css';

function AddPayment() {
    const [order, setOrder] = useState({
        username: "",
        type: "Card", // Fixed initial state
        card_type: "",
        card_holder: "",
        card_number: "",
        expir_date: "",
        cvc: "",
        pay: ""
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: value
        }));

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "username":
            case "card_holder":
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    error = "This field should only contain letters.";
                }
                break;
            case "card_number":
                if (!/^\d+$/.test(value)) {
                    error = "Card number should only contain numbers.";
                }
                break;
            case "expir_date":
                const today = new Date();
                const selectedDate = new Date(value);
                if (selectedDate <= today) {
                    error = "The card has expired!";
                }
                break;
            default:
                break;
        }
        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform final validation before submitting
        const formErrors = {};
        for (const [name, value] of Object.entries(order)) {
            validateField(name, value);
            if (errors[name]) {
                formErrors[name] = errors[name];
            }
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            alert("Please fix the errors before submitting.");
            return;
        }

        try {
            const data = await axios.post("http://localhost:8020/create_payment", order);
            console.log(data);
            alert("Payment successful!");
        } catch (error) {
            console.error("Error making payment:", error);
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <div className="add-order">
            <h2>Add Payment</h2>
            <form onSubmit={handleSubmit}>
                <label>User Name:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleOnChange}
                    value={order.username}
                />
                {errors.username && <p className="error">{errors.username}</p>}

                <label>Select Payment Method:</label>
                <select id="type" name="type" onChange={handleOnChange} value={order.type}>
                    <option>Cash</option>
                    <option>Card</option>
                </select>

                {order.type === "Card" && (
                    <>
                        <label>Card Type:</label>
                        <input
                            type="text"
                            id="card_type"
                            name="card_type"
                            onChange={handleOnChange}
                            value={order.card_type}
                        />

                        <label>Card Holder:</label>
                        <input
                            type="text"
                            id="card_holder"
                            name="card_holder"
                            onChange={handleOnChange}
                            value={order.card_holder}
                        />
                        {errors.card_holder && <p className="error">{errors.card_holder}</p>}

                        <label>Card Number:</label>
                        <input
                            type="text"
                            id="card_number"
                            name="card_number"
                            onChange={handleOnChange}
                            value={order.card_number}
                        />
                        {errors.card_number && <p className="error">{errors.card_number}</p>}

                        <label>Expire Date:</label>
                        <input
                            type="date"
                            id="expir_date"
                            name="expir_date"
                            onChange={handleOnChange}
                            value={order.expir_date}
                        />
                        {errors.expir_date && <p className="error">{errors.expir_date}</p>}

                        <label>CVC:</label>
                        <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            onChange={handleOnChange}
                            value={order.cvc}
                        />
                    </>
                )}

                <label>Pay Now:</label>
                <input
                    type="text"
                    id="pay"
                    name="pay"
                    onChange={handleOnChange}
                    value={order.pay}
                />

                <button type="submit">Pay</button>
            </form>
            <br />
        </div>
    );
}

export default AddPayment;
