import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from 'C:/Users/Yasitha/Documents/GitHub/prana/frontend/src/components/image/dashboardd.jpg';

const cardStyle = {
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '40px',
  textAlign: 'center',
  backgroundImage: 'linear-gradient(135deg, #f9f9f9 25%, #e0e0e0 100%)',
  opacity: 0,
  animation: 'fadeIn 1s forwards',
};

const buttonStyle = (backgroundColor) => ({
  backgroundColor: backgroundColor,
  color: '#fff',
  borderRadius: '10px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '90%',
  padding: '15px',
  margin: '20px auto',  // Centering buttons horizontally
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease, background-color 0.3s ease',
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '20px',
});

const hoverEffect = (btn) => {
  btn.addEventListener('mouseover', () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.boxShadow = '0px 6px 8px rgba(0, 0, 0, 0.15)';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
  });
};

const ItemManagement = () => {
  useEffect(() => {
    document.querySelectorAll('.btn').forEach(hoverEffect);
  }, []);

  return (
    <div style={{ 

      backgroundImage: `url(${backgroundImage})`, // Replace '/path/to/your/image.jpg' with the actual path to your image
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>

          <h1 className="text-center mb-4 animate-text" style={{ 
            color: '#333', 
            fontSize: '3.5em', 
            fontWeight: 'bold', 
            letterSpacing: '1px', 
            textTransform: 'uppercase', 
            marginTop: '-90px',
            marginBottom: '90px',
            animation: 'pulsate 2s infinite alternate',
            backgroundImage: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), -2px -2px 5px rgba(255, 255, 255, 0.2)'
          }}>Manage Items</h1>

          <Link to='/Additem' className="btn btn-primary" style={buttonStyle('#28a745')}>
            <i className="fas fa-plus-circle mr-2"></i>Add New Item
          </Link>
          <Link to='/Itemlist' className="btn btn-primary" style={buttonStyle('#007bff')}>
            <i className="fas fa-list mr-2"></i>View Item List
          </Link>
          <Link to='/Request' className="btn btn-primary" style={buttonStyle('#dc3545')}>
            <i className="fas fa-envelope mr-2"></i>Send Request
          </Link>
        </div>
      </div>
    
  );
}

export default ItemManagement;
