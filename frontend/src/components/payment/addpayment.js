import { useState } from "react";
import axios from "axios";
import './addorder.css';

function AddPayment() {
    const [order, setOrder] = useState({
        usename: "",
        type: "Cash",
        card_type: "",
        card_holder_name: "",
        card_number: "",
        expir_date: "",
        cvv: "",
        amount: "",
        payment_details: ""
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
            case "usename":
            case "card_holder_name":
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
                    error = "Expiration date must be in the future.";
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
            const data = await axios.post("http://localhost:8000/api/card/create_payment", order);
            console.log(data);
            alert("Payment successfully!");
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
                    id="usename"
                    name="usename"
                    onChange={handleOnChange}
                    value={order.usename}
                />
                {errors.usename && <p className="error">{errors.usename}</p>}

                <label>Select Payment Method:</label>
                <select id="type" name="type" onChange={handleOnChange} value={order.type}>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                </select>

                {order.type === "Cash" &&
                <>
                    <label>Payment Details:</label>
                    <input
                        type="text"
                        id="payment_details"
                        name="payment_details"
                        onChange={handleOnChange}
                        value={order.payment_details}
                    />
                </>
                }

                {order.type === "Card" &&
                <>
                    <label>Card Type:</label>
                    <input
                        type="text"
                        id="card_type"
                        name="card_type"
                        onChange={handleOnChange}
                        value={order.card_type}
                    />

                    <label>Card Holder Name:</label>
                    <input
                        type="text"
                        id="card_holder_name"
                        name="card_holder_name"
                        onChange={handleOnChange}
                        value={order.card_holder_name}
                    />
                    {errors.card_holder_name && <p className="error">{errors.card_holder_name}</p>}

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

                    <label>CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        onChange={handleOnChange}
                        value={order.cvv}
                    />
                </>
                }

                <label>Amount:</label>
                <input
                    type="text"
                    id="amount"
                    name="amount"
                    onChange={handleOnChange}
                    value={order.amount}
                />
                {errors.amount && <p className="error">{errors.amount}</p>}

                <button type="submit">{order.type === "Cash" ? "Place Order" : "Pay"}</button>
            </form>
            <br />
        </div>
    );
}

export default AddPayment;
