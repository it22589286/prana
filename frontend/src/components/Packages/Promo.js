import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
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
    <div style={cardStyle}>
      <img src={image} alt={name} style={cardImageStyle} />
      <div style={cardTextStyle}>
        <strong>{pid}</strong>
        <br />
        <span style={cardNameStyle}>{name}</span>
        <br />
        {description}
        <br />
        <span style={cardPriceStyle}>{price}</span>
        <br />
        <h6 style={cardValidityStyle}>Valid till {validity}</h6>
      </div>
      <div style={buttonContainerStyle}>
        <Button variant="success" onClick={updateHandler} style={updateButtonStyle}>
          <FaEdit /> Update
        </Button>
        <Button onClick={deleteHandler} variant="danger" style={deleteButtonStyle}>
          <FaTrash /> Delete
        </Button>
      </div>
    </div>
  );
};

const cardStyle = {
  margin: 'auto',
  marginTop: '20px',
  padding: '5px',
  height: '500px',
  maxWidth: '100%',
  boxShadow: '5px 5px 10px #ccc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
};

const cardImageStyle = {
  margin: 'auto',
  width: '100%',
  height: '200px',
};

const cardTextStyle = {
  padding: '5px',
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#333',
};

const cardNameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const cardPriceStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
};

const cardValidityStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const updateButtonStyle = {
  marginLeft: '0px',
  width: '100%',
  backgroundColor: '#386FA2',
};

const deleteButtonStyle = {
  marginLeft: '0px',
  width: '100%',
  marginTop: '5px',
};

export default Promo;
