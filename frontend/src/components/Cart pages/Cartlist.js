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
    const input = document.getElementById('pdf-report-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('monthly_cart_report.pdf');
      
    });
  };

  return (
    <div style={{
      marginTop: "40px",
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
    }}>
      <div id="pdf-report-content">
        <h2 style={{ textAlign: "center", color: "#007bff" }}>Shopping Cart</h2>
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
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #007bff" }}>
                  Name
                </th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #007bff" }}>
                  Item Code
                </th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #007bff" }}>
                  Count
                </th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #007bff" }}>
                  Price
                </th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #007bff" }}>
                  Colour
                </th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #007bff" }}>
                  Image
                </th>
                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #007bff" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} style={{ backgroundColor: "#f8f9fa", border: "1px solid #ddd" }}>
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
                <td colSpan="5" style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>
                  {cartItems.map((item, index) => (
                    <p key={index} style={{ 
                      fontSize: "1rem", 
                      color: "#333", 
                      padding: "10px 0", 
                      borderBottom: "1px solid #ddd",
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center"
                    }}>
                      <span>
                        <strong style={{ fontWeight: "bold", marginRight: "5px" }}>{item.name}:</strong> 
                        ${item.price} x {item.quantity}
                      </span>
                      <span>= ${item.price * item.quantity}</span>
                    </p>
                  ))}
                </td>
                <td colSpan="2" style={{ 
                  padding: "12px", 
                  textAlign: "left", 
                  border: "1px solid #ddd", 
                  backgroundColor: "#f8f9fa" 
                }}>
                  <h5 style={{ margin: 0, color: "#007bff" }}>
                    <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
  
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
