import React, { useState } from 'react';
import axios from 'axios';

export default function Request() {
  const [formData, setFormData] = useState({
    name: '',
    count: '',
    color: '',
    expireDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/requestItem/create", formData);
      console.log(res.data); // Log response data for testing
      // Reset form data after successful submission if needed
      setFormData({
        name: '',
        count: '',
        color: '',
        expireDate: ''
      });
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle error here
    }
  };

  return (
    <div className=""style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1 className="text-center mt-5 mb-4">Request Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="count" className="form-label">Count</label>
          <input type="number" className="form-control" id="count" name="count" value={formData.count} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color</label>
          <input type="text" className="form-control" id="color" name="color" value={formData.color} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="expireDate" className="form-label">Expire Date</label>
          <input type="date" className="form-control" id="expireDate" name="expireDate" value={formData.expireDate} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
