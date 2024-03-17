import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css';


const Navbar1 = () => {
   
  return (
   
    
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand  as ={Link}to="/">Prana</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link  as={Link} to="/">Home</Nav.Link>
        <Nav.Link  as={Link} to="/store">Store</Nav.Link>
        <Nav.Link as={Link} to="/packages">Packages</Nav.Link>
       <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
      <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
        
        
      </Nav>
    </Container>
  </Navbar>
    
   
   
  )
}

export default Navbar1
