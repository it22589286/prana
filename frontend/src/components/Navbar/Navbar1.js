import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../imagefiles/logo.png'
import Image from 'react-bootstrap/Image';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';
//import { LoaderIcon } from 'react-hot-toast';


const Navbar1 = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem('user'));
  const userRole = auth ?auth.role : null;

  const handleHomeClick = () => {
    if (auth) { // If user is logged in
      if (userRole === 'Supplier') {
        navigate('/supplier');
      } else if (userRole === 'customer') {
        navigate('/dashboard');
      }else if (userRole === 'Instructor') {
        navigate('/instructor');
      }
    } else { // If user is logged out
      navigate('/');
    }
  };

  const logout =()=>{
    localStorage.clear()
    navigate('/signup')
  }
   
  return (
   
    
    <Navbar className="nav1" >
    <Container>
      <Navbar.Brand   onClick={handleHomeClick} style={{ fontSize: '24px', fontWeight: 'bold' }}>Prana</Navbar.Brand>
      <Nav className="me-auto " style={{marginLeft:"450px",padding:"10px"}}>
        <Nav.Link  onClick={handleHomeClick} >Home</Nav.Link>
        {userRole !== 'Supplier' && userRole !== 'Instructor' && (
            <Nav.Link as={Link} to="/store">Store</Nav.Link>
          )}
          {userRole !== 'Supplier' && userRole !== 'Instructor' && (
            <Nav.Link as={Link} to="/packages">Packages</Nav.Link>
          )}
       
      
        
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
