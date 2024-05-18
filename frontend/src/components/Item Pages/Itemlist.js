import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import backgroundImage from 'C:/Users/Yasitha/Documents/GitHub/prana/frontend/src/components/image/dashboardd.jpg';

export default function ItemList() {
  const [itemList, setItemList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setSearchResults(itemList);
  }, [itemList]);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/item");
      setItemList(response.data);
    } catch (error) {
      console.error("Error fetching item list:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        await axios.delete(`/deleteitem/${id}`);
        setItemList(itemList.filter((item) => item._id !== id));
        toast.success("Item deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSearch = () => {
    const results = itemList.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults(itemList);
  };

  const generatePDF = () => {
    const table = document.getElementById("report-table");
    const rows = table.querySelectorAll("tr");

    // Hide the action and image columns
    rows.forEach((row) => {
      const actionCell = row.cells[6];
      const imageCell = row.cells[5];
      if (actionCell) {
        actionCell.style.display = "none";
      }
      if (imageCell) {
        imageCell.style.display = "none";
      }
    });

    html2canvas(table)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("item_list.pdf");

        // Restore the action and image column visibility
        rows.forEach((row) => {
          const actionCell = row.cells[6];
          const imageCell = row.cells[5];
          if (actionCell) {
            actionCell.style.display = "table-cell";
          }
          if (imageCell) {
            imageCell.style.display = "table-cell";
          }
        });
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
        // Restore the action and image column visibility in case of error
        rows.forEach((row) => {
          const actionCell = row.cells[6];
          const imageCell = row.cells[5];
          if (actionCell) {
            actionCell.style.display = "table-cell";
          }
          if (imageCell) {
            imageCell.style.display = "table-cell";
          }
        });
      });
  };

  const imageStyle = {
    maxWidth: "100px",
    maxHeight: "100px",
    width: "auto",
    height: "auto",
  };

  return (
    
    <div className="mt-5" style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1 className="text-center mb-4 animate-text" style={{ 
  color: '#333', 
  fontSize: '3.5em', 
  fontWeight: 'bold', 
  letterSpacing: '1px', 
  textTransform: 'uppercase', 
  marginTop: '10px',
  marginBottom: '200px',
  backgroundImage: 'linear-gradient(135deg, #667eea, #764ba2)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(255, 255, 255, 0.2)',
  animation: 'glow 2s infinite alternate, fade-in 1s ease-in-out, rotate 3s infinite linear, scale 2s infinite alternate', // Added scale animation
}}>
  Manage Items
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

      <div className="mb-4" style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="Search by item name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          style={{ flexGrow: 1, marginRight: "5px" }}
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary"
          style={{ marginRight: "5px" }}
        >
          Search
        </button>
        <button
          onClick={clearSearch}
          className="btn btn-success"
        >
          Clear
        </button>
      </div>

      <div className="table-responsive">
        <table id="report-table" className="table table-striped table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>Name</th>
              <th>Item Code</th>
              <th>Count</th>
              <th>Price</th>
              <th>Colour</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              searchResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.itemcode}</td>
                  <td>{item.count}</td>
                  <td>${item.price}</td>
                  <td>{item.colour}</td>
                  <td className="text-center">
                    <img
                      style={imageStyle}
                      src={`http://localhost:8000/image/${item.image}`}
                      alt={item.name}
                    />
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/updateitem/${item._id}`}
                        className="btn btn-primary btn-sm update-button">
                        Update
                      </Link>
                      <button
                        className="btn btn-danger btn-sm delete-button"
                        onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button className="btn btn-primary" onClick={generatePDF}>
          Generate Report (PDF)
        </button>
      </div>
    </div>
  );
}
