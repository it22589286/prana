import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from 'C:/Users/Yasitha/Documents/GitHub/prana/frontend/src/components/image/dashboardd.jpg';

export default function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const filterCartItemsByDate = () => {
    if (!startDate || !endDate) return cartItems;
    return cartItems.filter(item => {
      const itemDate = new Date(item.createdAt);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const generateMonthlyReport = () => {
    const filteredItems = filterCartItemsByDate();
    const input = document.getElementById('pdf-report-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, 0);
      pdf.save('monthly_cart_report.pdf');
    });
  };

  return (
    <section className="background" style={{ padding: "50px 0", textAlign: "center", backgroundImage: `url(${backgroundImage})` }}>
      <div style={{
        marginTop: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
      }}>

        <div id="pdf-report-content">
          <h1 className="text-center mb-4 animate-text" style={{ 
            color: '#333', 
            fontSize: '3.5em', 
            fontWeight: 'bold', 
            letterSpacing: '1px', 
            textTransform: 'uppercase', 
            marginTop: '-15px',
            marginBottom: '90px',
            backgroundImage: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(255, 255, 255, 0.2)',
            animation: 'glow 2s infinite alternate, fade-in 1s ease-in-out, rotate 3s infinite linear, scale 2s infinite alternate', 
          }}>
            Shopping Cart
          </h1>
          <style>
            {`
              @keyframes fade-in {
                0% {
                  opacity: 0;
                }
                100% {
                  opacity: 1;
                }
              }

              @keyframes rotate {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }

              @keyframes scale {
                0% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.05);
                }
                100% {
                  transform: scale(1);
                }
              }
            `}
          </style>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6c757d" }}>
              No items in cart
            </p>
          ) : (
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", 
              borderRadius: "10px", 
              padding: "20px", 
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)", 
              backdropFilter: "blur(10px)" 
            }}>
              <table style={{ 
                width: "100%", 
                borderCollapse: "collapse", 
                marginTop: "20px" 
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
                  {filterCartItemsByDate().map((item) => (
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
                      {filterCartItemsByDate().map((item, index) => (
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
            </div>
          )}
        </div>
        
        <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "10px", }}>
          <DatePicker
          
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            dateFormat="yyyy/MM/dd"
            style={{ marginRight: "10px" }}
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            placeholderText="End Date"
            dateFormat="yyyy/MM/dd"
            style={{ marginLeft: "-10px" }}
          />
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
    </section>
  );
}
