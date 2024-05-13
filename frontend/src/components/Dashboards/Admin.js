
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import{Container,Row,Col} from 'react-bootstrap'
import Image4 from '../imagefiles/dashboard.jpg'
import Image1 from '../imagefiles/feedback.png'
import Image2 from '../imagefiles/user.png'
import Image3 from '../imagefiles/payment.png'
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const navigate = useNavigate();
  return (
    <div style={{ height: '100vh', backgroundImage: `url(${Image4})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',}}>
      
   

   
     <Container style={{ marginTop: '5rem' }}>
     <Row className ="justify-content-center">

        <Col md={3}>

   <Card style={{ width: '18rem', backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white' ,height:'200px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
   <Card.Body className='text-center'>
   <Card.Title>User Management</Card.Title>
       
        
        <Card.Img variant="top" src={Image2}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}} />
          
          <Button  style={{marginLeft:'90px'}} variant="primary" onClick={()=> navigate('/usermanager')}>Manage </Button>
        </Card.Body>
      </Card>

      </Col>


      <Col md={3} >

      <Card style={{ width: '18rem' , backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px'}}>
      <Card.Body className='text-center'>
      <Card.Title>Package Management</Card.Title>
        
        
        <Card.Img variant="top" src={Image3}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}}/>
         
          <Button  style={{marginLeft:'90px'}} variant="primary"  >Manage </Button>
        </Card.Body>
      </Card>

      </Col>

      <Col md={3} >

      <Card style={{ width: '18rem', backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px' }}>
      <Card.Body className='text-center'>
      <Card.Title>Schedule Management</Card.Title>
       
        
        <Card.Img variant="top" src={Image3}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}} />
          
          <Button  style={{marginLeft:'90px'}} variant="primary"  >Manage </Button>
        </Card.Body>
      </Card>
      </Col>

       <Col md={3}>
      <Card style={{ width: '18rem', backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px' }}>
      <Card.Body className='text-center'>
      <Card.Title>Feedback Management</Card.Title>
      
        
        <Card.Img variant="top" src={Image3}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}} /> 
         
          <Button variant="primary" style={{marginLeft:'90px'}} onClick={()=> navigate('/fed')}>Manage</Button>
        </Card.Body>
      </Card>
      </Col>

      </Row>
      </Container>
      
<Container style={{ marginTop: '5rem' }}>
      <Row className ="justify-content-center">

      <Col md={3}>

      <Card style={{ width: '18rem', backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white', height:'200px'}}>
      <Card.Body className='text-center'>
      <Card.Title>Financial Management</Card.Title>
       
        
        <Card.Img variant="top" src={Image3}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}} />
         
        
          <Button variant="primary"  style={{marginLeft:'90px'}}>Manage</Button>
        </Card.Body>
      </Card>
      </Col>

      <Col md={3}>

      <Card  style={{ width: '18rem', backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px' }}>
      <Card.Body className='text-center'>
      <Card.Title>Leave Operation Management</Card.Title>
        
      
         
        <Card.Img variant="top" src={Image3}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}} />
          <Button variant="primary"  style={{marginLeft:'90px'}}>Manage </Button>
        </Card.Body>
      </Card>

      </Col>

      <Col md={3}>
      <Card style={{ width: '18rem', backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px' }}>
      <Card.Body className='text-center'>
      <Card.Title>Inventory Management</Card.Title>
      
        
        <Card.Img variant="top" src={Image3}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}} /> 
         
          <Button variant="primary" style={{marginLeft:'90px'}} >Manage</Button>
        </Card.Body>
      </Card>
      </Col>

      <Col md={3}>
      <Card style={{ width: '18rem', backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px' }}>
      <Card.Body className='text-center'>
      <Card.Title>Supplier Management</Card.Title>
      
        
        <Card.Img variant="top" src={Image3}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}} /> 
         
          <Button variant="primary" style={{marginLeft:'90px'}} >Manage </Button>
        </Card.Body>
      </Card>
      </Col>
      
      </Row>
      </Container>
     
      
    </div>
  )
}

export default Admin
