import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import packagepromo from "../imagefiles/packagepromo.jpg"

const PromoDetail = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    pid: '',
    name: '',
    description: '',
    price: '',
    validity: '',
    image: ''
  });

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/promopackage/${id}`);
        if (response.data.promopackages) {
          setInputs(prevState => ({
            ...prevState,
            ...response.data.promopackages,
            image: response.data.promopackages.image || '' // Set image URL or empty string if not available
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);
  

  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/promopackage/${id}`, inputs);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }

  const handleChange = (e) => {
    if (e.target.name !== 'pid') { // Ignore changes to the pid field
      setInputs(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputs(prevState => ({
          ...prevState,
          image: reader.result // Set the image URL to the data URL of the selected file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      toast.success('Package updated successfully');
      history('/package');
    } catch (error) {
      toast.error('Failed to update package');
      // Handle error
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', marginBottom: '30px', marginTop: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold', color: 'black' }}>Edit Promo Package</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="pid">
            <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>PID</Form.Label>
            <Form.Control type="text" placeholder="Enter PID" name="pid" onChange={handleChange} value={inputs.pid} style={{ width: '100%' }} />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange} value={inputs.name} style={{ width: '100%' }} />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter description" name="description" onChange={handleChange} value={inputs.description} style={{ width: '100%' }} />
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Price</Form.Label>
            <Form.Control type="text" placeholder="Enter price" name="price" onChange={handleChange} value={inputs.price} style={{ width: '100%' }} />
          </Form.Group>

          <Form.Group controlId="validity">
            <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Valid till</Form.Label>
            <Form.Control type="date" placeholder="Enter validity" name="validity" onChange={handleChange} value={inputs.validity} style={{ width: '100%' }} />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleImageChange} accept="image/*" style={{ width: '100%' }} />
            {inputs.image && <img src={inputs.image} alt="Selected" style={{ maxWidth: '10%', marginTop: '10px' }} />}
          </Form.Group>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="primary" type="submit" style={{ backgroundColor: '#386FA2', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', margin: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              Update
            </Button>
          </div>
        </Form>
      </div>
      <img src={packagepromo} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} alt="background" />
    </div>
  )
}

export default PromoDetail;
