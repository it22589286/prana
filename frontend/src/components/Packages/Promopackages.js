import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Promo from "./Promo";
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import packagepromo from "../imagefiles/packagepromo.jpg"
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
        <table>
          <thead>
            <tr>
              <th>PID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Valid till</th>
            </tr>
          </thead>
          <tbody>
            ${promopackages.map((ppackage) => (
              `<tr key=${ppackage._id}>
                <td>${ppackage.pid}</td>
                <td>${ppackage.name}</td>
                <td>${ppackage.description}</td>
                <td>${ppackage.price}</td>
                <td>${ppackage.validity}</td>
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
  };

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={handleAddButtonClick} style={buttonStyle}>
            Add Package
          </Button>
          <Button onClick={handleViewButtonClick} style={buttonStyle}>
            View Packages
          </Button>
          <Button onClick={generateReport} style={reportButtonStyle}>
            Generate Report
          </Button>
        </ButtonGroup>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearch}
            style={searchInputStyle}
          />
          <FaSearch style={searchIconStyle} />
        </div>
      </div>
      {noResults ? (
        <div>
          <p>No Promo Packages Found</p>
        </div>
      ) : (
        <ul style={ulStyle}>
          {promopackages && promopackages.map((promopackage, i) => (
            <li style={liStyle} key={i}>
              <Promo promopackage={promopackage} />
            </li>
          ))}
        </ul>
      )}
      <img src={packagepromo} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} alt="background" />
    </div>
  );
}

const containerStyle = {
  margin: 0,
  padding: 0,
  fontFamily: 'Arial, sans-serif',
  backgroundImage: 'url("../imagefiles/propack.jpg")',
  backgroundSize: 'cover',
  backdropFilter: 'blur(5px)',
  backgroundRepeat: 'no-repeat',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

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

const reportButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  margin: '0 10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  marginLeft: '10px',
};

const searchInputStyle = {
  paddingRight: '30px',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '16px',
  outline: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '700px',
};

const searchIconStyle = {
  position: 'absolute',
  right: '10px',
  fontSize: '20px',
  color: '#386FA2',
};

const ulStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const liStyle = {
  padding: '10px',
  margin: '10px',
  width: '100%',
  maxWidth: '250px',
};

export default Promopackages;
