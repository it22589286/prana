import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from 'C:/Users/Yasitha/Documents/GitHub/prana/frontend/src/components/image/dashboard.jpg';

export default function UserMain() {
  const [itemList, setItemList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/item");
      setItemList(response.data);
    } catch (error) {
      console.error("Error fetching item list:", error);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      if (selectedQuantity > item.count) {
        setError(`Cannot add more than ${item.count} items to cart`);
        return;
      }
      
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("itemcode", item.itemcode);
      formData.append("count", item.count);
      formData.append("price", item.price);
      formData.append("colour", item.colour);
      formData.append("quantity", selectedQuantity);

      const imageFile = await fetch(`http://localhost:8000/image/${item.image}`);
      const blob = await imageFile.blob();
      const file = new File([blob], item.image, { type: blob.type });

      formData.append("image", file);

      await axios.post("/cartcreate", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success(`${item.name} added to cart successfully!`);
      setError("");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart. Please try again later.");
    }
  };

  const handleSearch = () => {
    const filteredItems = itemList.filter((item) =>
      item._id.includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setItemList(filteredItems);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchItems();
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
    setError(""); // Reset error message when quantity changes
  };

  return (
    <div className="flex" style={{ 

      backgroundImage: `url(${backgroundImage})`, // Replace '/path/to/your/image.jpg' with the actual path to your image
      backgroundSize: 'cover',

    }}>
<div className="row">
  <div className="col  mt-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search by ID or Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        borderRadius: "0.5rem",
        border: "2px solid #ced4da",
        padding: "0.5rem 1rem",
        color: "#495057",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
        width: "100%",
        maxWidth: "500px",
        fontSize: "1rem",
        marginLeft:"400px"
      }}
    />
  </div>
  
  <div className="col-auto" style={{ display: "flex", alignItems: "center" , marginRight:"-90px"}}>
    <button className="btn btn-primary" onClick={handleSearch} style={{ borderRadius: "0.5rem", fontSize: "1rem", padding: "0.5rem 1rem", marginRight: "-140px" }}>Search</button>
    <button className="btn btn-secondary" onClick={handleClearSearch} style={{ borderRadius: "0.5rem", fontSize: "1rem", padding: "0.5rem 1rem",marginRight: "470px" }}>Clear</button>
  </div>
</div>




    <div className="container" style={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px", marginTop:"25px" }}>

      
      <div className=" row row-cols-1 row-cols-md-3 g-4">
        {itemList.map((item) => (
          <div className="col" key={item._id}>
            <div className="card h-100" style={{ borderRadius: "10px", backgroundColor: "#fff", transition: "all 0.3s" }}>
              <img
                className="card-img-top"
                src={`http://localhost:8000/image/${item.image}`}
                alt={item.name}
                style={{ height: "250px", objectFit: "contain", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
              />
<div className="card-body" style={{ padding: "1.5rem", backgroundColor: "#f8f9fa", borderRadius: "0 0 10px 10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
  <h5 className="card-title" style={{ color: "#000000", fontSize: "1.4rem", fontWeight: "bold", marginBottom: "0.5rem", textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}>{item.name}</h5>
  <p className="card-text" style={{ color: "#6c757d", marginBottom: "0.5rem", fontSize: "1rem", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>Price: <span style={{ color: "#218838", fontSize: "1.2rem", fontWeight: "bold", textDecoration: "underline", textDecorationColor: "#FF5733" }}>${item.price}</span></p>
  <p className="card-text" style={{ color: "#6c757d", marginBottom: "0.5rem", fontSize: "1rem", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}>Available: <span style={{ color: "#218838" }}>{item.count}</span> items</p>
</div>

              <div className="card-footer" style={{ borderTop: "none", backgroundColor: "#fff", borderRadius: "0 0 10px 10px" }}>
                <div className="d-flex align-items-center justify-content-between">
                  <select
                    className=""
                    onChange={handleQuantityChange}
                    value={selectedQuantity}
                    style={{ width: "50%", border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.375rem 0.75rem", color: "#495057" }}
                  >
                    {[...Array(item.count).keys()].map((number) => (
                      <option key={number + 1} value={number + 1}>
                        {number + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-success w-100"
                    onClick={() => handleAddToCart(item)}
                    style={{
                      borderRadius: "0.25rem",
                      background: "linear-gradient(145deg, #4CAF50, #2E8B57)",
                      border: "1px solid #2E8B57",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s",
                      padding: "0.375rem 0.75rem",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "1rem"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    Add to Cart
                  </button>
                </div>
                {error && <p className="text-danger mt-2" style={{ margin: 0 }}>{error}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
  
  
  

}
