import React from "react";
import Image from "./imagefiles/hompage.jpg";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div 
    style={{
      height: "100vh",
      backgroundImage: `url(${Image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="content">
        <h1>Your home for Yoga</h1>
        <p>Find Balance, Strength, and Serenity at Prana Yoga Institute!"</p>
        <Link to="/signup">Become a member</Link>
      </div>
    </div>
  );
};

export default Home;
