import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';
import { LoaderIcon } from 'react-hot-toast';


const Navbar1 = () => {
  const navigate = useNavigate(); 
  const auth = localStorage.getItem('user');
  const logout =()=>{
    localStorage.clear()
    navigate('/signup')
  }
   
  return (
   
    
    <Navbar className="nav1" >
    <Container>
      <Navbar.Brand  as ={Link}to="/">Prana</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link  as={Link} to="/">Home</Nav.Link>
        <Nav.Link  as={Link} to="/store">Store</Nav.Link>
        <Nav.Link as={Link} to="/packages">Packages</Nav.Link>
        
       
      
        
      </Nav>
      <Nav className='box'>

     {
      auth ?<Nav.Link as={Link} to="/signup" onClick={logout} style={{ backgroundColor: '#E54545', borderRadius: '20px', color: 'white' }}>LogOut</Nav.Link>
      :<>
      <Nav.Link as={Link} to="/signup" style={{ backgroundColor: '#E54545', borderRadius: '10px', color: 'white' ,marginRight: '10px'}}>Sign Up</Nav.Link>
      <Nav.Link as={Link} to="/signin" style={{ backgroundColor: '#E54545', borderRadius: '10px', color: 'white' }}>Sign In</Nav.Link>
      </>
     }
      </Nav>

    
    </Container>
  </Navbar>
    
   
   
  )
}

export default Navbar1
