import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import packagepromo from "../imagefiles/packagepromo.jpg"

const Addpromo = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    pid:  generatePID(),
    name: "",
    description: "",
    price: "",
    validity: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  //const [existingNames, setExistingNames] = useState([]);
 
  

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const validateForm =  () => {
    let valid = true;
    let errors = {};

    
    if (!inputs.pid.trim() || !inputs.pid.trim().match(/^PR\d{8}$/)) {
      errors.pid = 'PID should start with PR followed by 8 digits';
      valid = false;
    } 
    if (!inputs.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    } 
    

    if (!inputs.description.trim()) {
      errors.description = 'Description is required';
      valid = false;
    }

    if (!inputs.price.trim() || isNaN(inputs.price.trim())|| parseFloat(inputs.price) < 0) {
      errors.price = 'Price should be a non-negative number';
      valid = false;
    }

    if (!inputs.validity.trim()) {
      errors.validity = 'Validity is required';
      valid = false;
    }

    if (!inputs.image.trim()) {
      errors.image = 'Image URL is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputs((prevState) => ({
          ...prevState,
          image: reader.result // set the image URL
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8000/promopackage", {
      pid: String(inputs.pid),
      name: String(inputs.name),
      description: String(inputs.description),
      price: String(inputs.price),
      validity: String(inputs.validity),
      image: String(inputs.image)
    }).then(res => res.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await sendRequest();
        toast.success('Package added successfully', { autoClose: 25000 });
        history('/package');
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/add");
  };

  const handleViewButtonClick = () => {
    navigate("/package");
  };

  return (
   
    <div >
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px',marginTop: '20px' }}>
        <button onClick={handleAddButtonClick} style={buttonStyle}>Add Package</button>
        <button onClick={handleViewButtonClick} style={buttonStyle}>View Packages</button>
      </div>
      <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', marginBottom: '30px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', color: 'black' }}>Add New Package</h2>

      <Form onSubmit={handleSubmit}>
  <Form.Group controlId="pid" className="mb-3">
    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>PID:</Form.Label>
    <Form.Control type="text" placeholder="Enter PID (e.g., PR12345678)" name="pid" onChange={handleChange} value={inputs.pid} className="form-control" />
    {errors.pid && <p className="text-danger">{errors.pid}</p>}
  </Form.Group>
  <Form.Group controlId="name" className="mb-3">
    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Name:</Form.Label>
    <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange} value={inputs.name} className="form-control" />
    {errors.name && <p className="text-danger">{errors.name}</p>}
  </Form.Group>
  <Form.Group controlId="description" className="mb-3">
    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Description:</Form.Label>
    <Form.Control as="textarea" placeholder="Enter description" name="description" onChange={handleChange} value={inputs.description} className="form-control" />
    {errors.description && <p className="text-danger">{errors.description}</p>}
  </Form.Group>
  <Form.Group controlId="price" className="mb-3">
    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Price:</Form.Label>
    <Form.Control type="text" placeholder="Enter price" name="price" onChange={handleChange} value={inputs.price} className="form-control" />
   {errors.price && <p className="text-danger">{errors.price}</p>}
  </Form.Group>
  <Form.Group controlId="validity" className="mb-3">
    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Valid till:</Form.Label>
    <Form.Control type="date" placeholder="Enter validity" name="validity" onChange={handleChange} value={inputs.validity} className="form-control" />
    {errors.validity && <p className="text-danger">{errors.validity}</p>}
  </Form.Group>
  <Form.Group controlId="image" className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Image:</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImageChange} accept="image/*" className="form-control" />
              {inputs.image && <img src={inputs.image} alt="Selected" style={{ maxWidth: '10%', marginTop: '10px' }} />}
              {errors.image && <p className="text-danger">{errors.image}</p>}
            </Form.Group>
  <Button variant="primary" type="submit" style={submitButtonStyle}>
    Submit
  </Button>
</Form>

      </div>
    </div>
    <img src={packagepromo} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} alt="background" />

    </div>
   
  )
}

const buttonStyle = {
  backgroundColor: '#386FA2',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  margin: '0 10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const submitButtonStyle = {
  backgroundColor: '#386FA2',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  margin: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
 
};
const generatePID = () => {
  return 'PR' + Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
}

export default Addpromo;
