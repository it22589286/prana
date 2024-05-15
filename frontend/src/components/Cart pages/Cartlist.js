import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);

  useEffect(() => {
    fetchCartItems();
    calculateTotalPrice();
    calculateMonthlyCost();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
    calculateMonthlyCost();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item from cart?"
      );
      if (confirmed) {
        await axios.delete(`/deletecart/${id}`);
        setCartItems(cartItems.filter((item) => item._id !== id));
        toast.success("Item deleted from cart successfully!");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.quantity,
      0
    );
    setTotalPrice(totalPrice);
  };

  const calculateMonthlyCost = () => {
   
    const monthlyCost = 0; 
    setMonthlyCost(monthlyCost);
  };

  const generateMonthlyReport = () => {
    // Generate PDF report
    const doc = new jsPDF();
    doc.text("Monthly Cart Report", 10, 10);
    doc.text("Cart Items:", 10, 40);
    doc.text("Monthly Cost: $" + monthlyCost.toFixed(2), 10, 30);
    doc.text("Total Price: $" + totalPrice.toFixed(2), 10, 20);
    
    let yPos = 50;
    cartItems.forEach((item) => {
      doc.text(
        `${item.name} - ${item.quantity} x $${item.price} = $${item.price * item.quantity}`,
        10,
        yPos
      );
      yPos += 10;
    });
    doc.save("monthly_cart_report.pdf");
  };

  return (
    <div style={{ 
      maxWidth: "900px", 
      margin: "0 auto", 
      padding: "20px", 
      backgroundColor: "#f8f9fa", 
      borderRadius: "10px", 
      boxShadow: "0 50px 20px rgba(255, 0, 0, 0.3)"
    }}>

  
      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6c757d" }}>
          No items in cart
        </p>
      ) : (
        <table style={{ 
          width: "100%", 
          borderCollapse: "collapse", 
          marginTop: "20px", 
          backgroundColor: "#fff", 
          borderRadius: "10px", 
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" 
        }}>
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th style={{ 
                padding: "12px", 
                textAlign: "left", 
                border: "1px solid #007bff" 
              }}>
                Name
              </th>
              <th style={{ 
                padding: "12px", 
                textAlign: "left", 
                border: "1px solid #007bff" 
              }}>
                Item Code
              </th>
              <th style={{ 
                padding: "12px", 
                textAlign: "left", 
                border: "1px solid #007bff" 
              }}>
                Count
              </th>
              <th style={{ 
                padding: "12px", 
                textAlign: "left", 
                border: "1px solid #007bff" 
              }}>
                Price
              </th>
              <th style={{ 
                padding: "12px", 
                textAlign: "left", 
                border: "1px solid #007bff" 
              }}>
                Colour
              </th>
              <th style={{ 
                padding: "12px", 
                textAlign: "left", 
                border: "1px solid #007bff" 
              }}>
                Image
              </th>
              <th style={{ 
                padding: "12px", 
                textAlign: "left", 
                border: "1px solid #007bff" 
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr 
                key={item._id} 
                style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd" }}
              >
                <td style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  {item.name}
                </td>
                <td style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  {item.itemcode}
                </td>
                <td style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  ${item.price}
                </td>
                <td style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  {item.colour}
                </td>
                <td style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  <img
                    src={`http://localhost:8000/image/${item.image}`}
                    alt={item.name}
                    style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                  />
                </td>
                <td style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  <button
                    style={{ 
                      padding: "8px 16px", 
                      fontSize: "1rem", 
                      cursor: "pointer", 
                      backgroundColor: "#dc3545", 
                      color: "#fff", 
                      border: "none", 
                      borderRadius: "5px" 
                    }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td 
                colSpan="5" 
                style={{ 
                  padding: "12px", 
                  textAlign: "left", 
                  border: "1px solid #ddd" 
                }}
              >
                {cartItems.map((item, index) => (
                  <p key={index}>
                    <strong>{item.name}:</strong> ${item.price} x {item.quantity} = ${item.price * item.quantity}
                  </p>
                ))}
              </td>
              <td 
                colSpan="2" 
                style={{ 
                  padding: "12px", 
                  textAlign: "left", 
                  border: "1px solid #ddd", 
                  backgroundColor: "#f8f9fa" 
                }}
              >
                <h5 style={{ margin: 0, color: "#007bff" }}>
                  <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      )}
  
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={{ 
            padding: "10px 20px", 
            fontSize: "1rem", 
            cursor: "pointer", 
            backgroundColor: "#28a745", 
            color: "#fff", 
            border: "none", 
            marginRight: "10px", 
            borderRadius: "5px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" 
          }}
          onClick={generateMonthlyReport}
        >
          Generate Monthly Report
        </button>
        <button
          style={{ 
            padding: "10px 20px", 
            fontSize: "1rem", 
            cursor: "pointer", 
            backgroundColor: "#007bff", 
            color: "#fff", 
            border: "none", 
            borderRadius: "5px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" 
          }}
        >
          Checkout (Total Price: ${totalPrice.toFixed(2)})
        </button>
      </div>
    </div>
  );
  
  
  
}
