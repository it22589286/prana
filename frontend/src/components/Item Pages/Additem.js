import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidImageAdd } from "react-icons/bi";
import "./Background.css";

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    itemcode: "",
    count: "",
    price: "",
    colour: "",
  });

  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("itemcode", formData.itemcode);
    form.append("count", formData.count);
    form.append("price", formData.price);
    form.append("colour", formData.colour);
    form.append("image", image);

    try {
      const res = await axios.post("/itemcreate", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({
        name: "",
        itemcode: "",
        count: "",
        price: "",
        colour: "",
      });
      setImage({});
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while adding item");
      setError("Error occurred while adding item");
    } finally {
      setLoading(false);
    }
  };
  

  return (
<section className="background" style={{ padding: "50px 0", textAlign: "center" }}>
<h1 className="text-center mb-4 animate-text" style={{ 
  color: '#333', 
  fontSize: '3.5em', 
  fontWeight: 'bold', 
  letterSpacing: '1px', 
  textTransform: 'uppercase', 
  marginTop: '10px',
  marginBottom: '90px',
  backgroundImage: 'linear-gradient(135deg, #667eea, #764ba2)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(255, 255, 255, 0.2)',
  animation: 'glow 2s infinite alternate, fade-in 1s ease-in-out, rotate 3s infinite linear, scale 2s infinite alternate', // Added scale animation
}}>
  Add Items
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




  <div className="row justify-content-center">
    <div className="col-md-6" style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", borderRadius: "10px", padding: "30px", background: "#f9f9f9", animation: "fadeInUp 1s ease-in-out" }}>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ color: "#333", fontSize: "1.2rem" }}>Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ borderRadius: "5px", border: "1px solid #ccc", padding: "10px", outline: "none", width: "100%", transition: "border-color 0.3s" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="itemcode" className="form-label" style={{ color: "#333", fontSize: "1.2rem" }}>Item Code</label>
          <input
            type="text"
            className="form-control"
            id="itemcode"
            value={formData.itemcode}
            onChange={handleChange}
            required
            style={{ borderRadius: "5px", border: "1px solid #ccc", padding: "10px", outline: "none", width: "100%", transition: "border-color 0.3s" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="count" className="form-label" style={{ color: "#333", fontSize: "1.2rem" }}>Count</label>
          <input
            type="number"
            className="form-control"
            id="count"
            value={formData.count}
            onChange={handleChange}
            required
            style={{ borderRadius: "5px", border: "1px solid #ccc", padding: "10px", outline: "none", width: "100%", transition: "border-color 0.3s" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label" style={{ color: "#333", fontSize: "1.2rem" }}>Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ borderRadius: "5px", border: "1px solid #ccc", padding: "10px", outline: "none", width: "100%", transition: "border-color 0.3s" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="colour" className="form-label" style={{ color: "#333", fontSize: "1.2rem" }}>Colour</label>
          <input
            type="text"
            className="form-control"
            id="colour"
            value={formData.colour}
            onChange={handleChange}
            required
            style={{ borderRadius: "5px", border: "1px solid #ccc", padding: "10px", outline: "none", width: "100%", transition: "border-color 0.3s" }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label" style={{ color: "#333", fontSize: "1.2rem" }}>Image</label>
          <div className="input-group">
            <input
              type="file"
              className="form-control"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              required
              style={{ borderRadius: "5px", border: "1px solid #ccc", padding: "10px", outline: "none", width: "calc(100% - 38px)", transition: "border-color 0.3s" }}
            />
            <label className="input-group-text" htmlFor="image" style={{ background: "#4CAF50", color: "#fff", borderRadius: "0 5px 5px 0", cursor: "pointer" }}>
              <BiSolidImageAdd />
            </label>
          </div>
        </div>

        <button
  type="submit"
  className="btn btn-primary"
  disabled={loading}
  style={{
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 30px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.3s",
    boxShadow: "0px 4px 8px rgba(76, 175, 80, 0.2)",
    width:"250px",
    marginLeft: "220px",
     // Adding box shadow for depth
  }}
  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"} // Scale up on hover
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"} // Restore scale on hover out
>
  {loading ? "Adding..." : "Add Item"}
</button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  </div>
</section>
  );
}
