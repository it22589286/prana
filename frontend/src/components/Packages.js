import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import packagepromo from './imagefiles/propack.jpg';

const Packages = () => {
  const [promopackages, setPromopackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/promopackage');
        setPromopackages(response.data.promopackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div  style={containerStyle}>
      <div className="packages-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {promopackages.map((promopackage) => (
          <div key={promopackage._id} className="card" style={{ width: '300px', margin: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img src={promopackage.image} alt={promopackage.name} style={{ width: '100%' ,height:"200px"}} />
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '34px', fontWeight: 'bold' }}>{promopackage.name}</span>
              <br />
              {promopackage.description}
              <br />
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{promopackage.price}</span>
              <br />
              <h6 style={{ fontWeight: 'bold', marginTop: '5px' }}>Valid till {promopackage.validity}</h6>
             <Link to={`/subscription/${promopackage._id}`} className="btn btn-primary" style={{ marginTop: '10px', backgroundColor: '#386FA2',border:'0px' }}>Get Started</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
const containerStyle = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  position: 'relative',
  minHeight: '100vh',
  backgroundImage:` url(${packagepromo})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export default Packages;
