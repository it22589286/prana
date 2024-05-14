import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './Promo.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit } from 'react-icons/fa';




const Promo = (props) => {
  const { _id, pid, name, description, price, validity, image } = props.promopackage;
  const history = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:8000/promopackage/${_id}`);
      toast.success('Package deleted successfully');
      history('/packages');
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error('Package deletion failed');
    }
  };
  const updateHandler = () => {
    history(`/packages/${_id}`);
  };

  return (
    
  <div className='card' >

  <img src={image} alt={name} />
  <p  style={{ fontSize: '16px', lineHeight: '1.5', color: '#333' }}>
    <strong>{pid}</strong>
    <br />
    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{name}</span>
    <br />
    {description}
    <br />
    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{price}</span>
    <br />
    <h6> valid till {validity}</h6>
  </p>

  <div >
    <Button variant='success' onClick={updateHandler} style={{marginLeft:"0px",width: '100%' , backgroundColor: '#386FA2'}} > <FaEdit />Update</Button>
    <Button onClick={deleteHandler} variant='danger'style={{marginLeft:"0px",width: '100%',marginTop:'5px'}} ><FaTrash />Delete</Button>
  </div>
  
</div>


  );
};

export default Promo;
