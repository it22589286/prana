import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Image5 from "./imagefiles/propack.jpg"
import { Container } from 'react-bootstrap';


const SubscriptionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageDetails, setPackageDetails] = useState(null);
  const [subscriptionType, setSubscriptionType] = useState('monthly'); // Default to monthly subscription
  const additionalCosts = {
    monthly: 500,
    quarterly: 1500,
    annual: 5000,
  };

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/promopackage/${id}`);
        setPackageDetails(response.data.promopackages);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleSubscriptionTypeChange = (event) => {
    setSubscriptionType(event.target.value);
  };

  const calculateTotalPrice = () => {
    let totalPrice = packageDetails.price; // Base package price

    totalPrice += additionalCosts[subscriptionType]; // Add additional cost based on the selected subscription type

    return totalPrice;
  };

  const handlePayNow = () => {
    // Check if there is user data in local storage
    const userData = localStorage.getItem('user');

    if (userData) {
      // User data exists, navigate to '/signin'
      navigate('/payment');
    } else {
      // No user data, navigate to '/payment'
      navigate('/signin');
    }
  };
  

  return (
    <div  
    style={backgroundContainerStyle}
    >
      <Container>
      {packageDetails && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="blur-container" style={{ width: '700px', height: '900px', margin: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <img src={packageDetails.image} alt="Package Image" style={{ width: '80%', maxHeight: '350px', marginTop: '20px' }} />

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px' }}> {/* Increased font size */}
              <p style={{ fontSize: '30px', fontWeight: 'bold' }}> {packageDetails.name}</p> {/* Added fontWeight */}
              <p style={{ fontWeight: 'bold' }}> {packageDetails.description}</p> {/* Added fontWeight */}
              <p style={{ fontSize: '26px', fontWeight: 'bold' }}>Price: {packageDetails.price}</p> {/* Added fontWeight */}
              <p style={{ fontSize: '28px', fontWeight: 'bold' }}>Subscribe to get the package:</p> {/* Added fontWeight */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <div style={{ display: 'block',marginRight: '26px' }}>
                  <input type="radio" id="monthly" name="subscriptionType" value="monthly" checked={subscriptionType === 'monthly'} onChange={handleSubscriptionTypeChange} />
                  <label htmlFor="monthly">Monthly (LKR {additionalCosts['monthly']})</label><br /><br />
                </div>
                <div style={{ display: 'block',marginRight: '3px' }}>
                  <input type="radio" id="quarterly" name="subscriptionType" value="quarterly" checked={subscriptionType === 'quarterly'} onChange={handleSubscriptionTypeChange} />
                  <label htmlFor="quarterly"> Quarterly (LKR {additionalCosts['quarterly']})</label><br /><br />
                </div>
                <div style={{ display: 'block',marginRight: '23px' }}>
                  <input type="radio" id="annual" name="subscriptionType" value="annual" checked={subscriptionType === 'annual'} onChange={handleSubscriptionTypeChange} />
                  <label htmlFor="annual">Annual (LKR {additionalCosts['annual']})</label><br /><br />
                </div>
              </div>
              <p style={{ fontSize: '28px', fontWeight: 'bold' }}>Total Price: {calculateTotalPrice()}</p> {/* Added fontWeight */}
              <button onClick={handlePayNow} style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Pay Now</button>
            </div>
          </div>
        </div>
      )}
      </Container>
    </div>
  );
}
const backgroundContainerStyle = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  backgroundImage: `url(${Image5})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  
};

export default SubscriptionDetails;