import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Promo from "./Promo";
import "./Promo.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const URL = "http://localhost:8000/promopackage";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

const Promopackages = () => {
  const [promopackages, setPromopackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setPromopackages(data.promopackages))
  }, []);

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/add");
  };

  const handleViewButtonClick = () => {
    navigate("/package");
  };



  const generateReport = () => {
    const reportContent = `
      <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Promo Packages Report</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
            <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>PID</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>Name</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>Description</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>Price</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px', backgroundColor: '#f2f2f2' }}>Valid till</th>
            </tr>
          </thead>
          <tbody>
            ${promopackages.map((ppackage) => (
              `<tr key=${ppackage._id}>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>${ppackage.pid}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>${ppackage.name}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>${ppackage.description}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>${ppackage.price}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>${ppackage.validity}</td>
              </tr>`
            )).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Open a new window to print the report
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportContent);
    reportWindow.print();
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    fetchHandler().then((data) => {
      const filteredPromoPackages = data.promopackages.filter((promoPackage) => {
        return Object.values(promoPackage).some((field) => {
          return field.toString().toLowerCase().includes(query);
        });
      });

      setPromopackages(filteredPromoPackages);
      setNoResults(filteredPromoPackages.length === 0);
    });
  }

  /*const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };*/

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={handleAddButtonClick} style={buttonStyle}>
            Add Package
          </Button>
          <Button onClick={handleViewButtonClick} style={buttonStyle}>
            View Packages
          </Button>
          <Button
            onClick={generateReport}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              margin: '0 10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            Generate Report
          </Button>
        </ButtonGroup>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
  <FaSearch style={{ position: 'absolute', left: '10px', fontSize: '20px', color: '#386FA2' }} />
  <input
    type="text"
    placeholder="Search by name..."
    value={searchQuery}
    onChange={handleSearch}
    style={{
      paddingLeft: '30px', // Add padding left to accommodate the icon
      marginRight: '10px',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '16px',
      outline: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '700px', // Adjust width as needed
    }}
  />
</div>

      </div>
      {noResults ? (
        <div>
          <p>No Promo Packages Found</p>
        </div>
      ) : (
        //<div ref={ComponenetRef}>
          <ul>
            {promopackages && promopackages.map((promopackage, i) => (
              <li className='promo' key={i}>
                <Promo promopackage={promopackage} />
              </li>
            ))}
          </ul>
       //</div>
      )}
    </div>
  );
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

export default Promopackages;
