import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateItem() {
  const [formData, setFormData] = useState({
    name: '',
    itemcode: '',
    count: '',
    price: '',
    colour: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/itembyid/${itemId}`);
        if (response.data) {
          setFormData(response.data.item); 
        } else {
          console.error('Empty response data');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
        setError(error.message || 'Error fetching item details');
      }
    };
  
    fetchItemDetails();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`/updateitem/${itemId}`, formData);
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      console.error('Error updating item:', error);
      setError(error.message || 'Error updating item');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };

  return (
    <div className='container p-4'>
      <h1 className='text-center mt-5'>Update Item</h1>
      <form onSubmit={handleSubmit} className='row justify-content-center mt-5 '>
       
        <div className="col-md-6">
          <input type="text" placeholder='Name' id='name' className={`form-control mb-4`} value={formData.name || ''} onChange={handleChange} required disabled={formData.name} />
          <input type="text" placeholder='Item Code' id='itemcode' className={`form-control mb-4`} value={formData.itemcode || ''} onChange={handleChange} required disabled={formData.itemcode} />
          <input type="number" placeholder='Count' id='count' className={`form-control mb-4`} value={formData.count || ''} onChange={handleChange} required />
          <input type="number" placeholder='Price' id='price' className={`form-control mb-4`} value={formData.price || ''} onChange={handleChange} required />
          <input type="text" placeholder='Colour' id='colour' className={`form-control mb-4`} value={formData.colour || ''} onChange={handleChange} required ={formData.colour} />
          <button disabled={loading} className='btn btn-primary btn-block text-center'>
  {loading ? 'Loading...' : 'Update'}
</button>
        </div>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}
