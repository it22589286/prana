import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <nav style={{width:"800px"}}>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <ul className="c1">
                <li>
                <Link to="/contactus">Contact Us</Link>
                </li>
                <li>
                  <Link to="/conditions">Terms & conditions</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 col-sm-6">
              <ul className="c1">
                <li>
                  <Link to="/feedback">Feedbacks</Link>
                </li>
                <li>
                  <Link to="/aims">Our Aims</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 col-sm-6">
              <ul className="c1">
                <li>
                  <Link to="/story">Our Story</Link>
                </li>
                <li>
                  <Link to="/policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            
        

         
          </div>
          <hr />
          <div className="row">
            <p className="col-sm">
              &copy;{new Date().getFullYear()}|All right reserved|Powered by
              Prana Yoga
            </p>
          </div>
          
        </nav>
      </div>
    </div>
  );
};

export default Footer;
