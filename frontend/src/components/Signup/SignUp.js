import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './Signup.css';
import { Link } from 'react-router-dom';
import Image from '../imagefiles/register.jpg'
const SignUp = () => {

  const [user,setUser] =useState();

  const handleSubmit = (event) =>{
    console.log(user)
    event.preventDefault();
    
  }

  const handlechange =(event) =>{
   // console.log(event.target.name,event.target.value);
    setUser({
      ...user,
      [event.target.name]:event.target.value
      
    })
  }
  return (
    <div className='hero' style={{backgroundImage:`url(${Image})`}}>
    <div className='container'  >
        <div className='form'>
    <Card className='shadow-lg'>
       <Card.Header className='mb-3'style={{backgroundColor:'orange',height:'60px'}}><h4>Register</h4></Card.Header>
       <Card.Body>
    <Form onSubmit={handleSubmit}>
      
        <Form.Group className="mb-3" >
        
          <Form.Control type="email" placeholder="Enter email" name="email" onChange={handlechange}/>
        </Form.Group>

        <Form.Group className="mb-3">
        
          <Form.Control type="text" placeholder="Enter nic" name="nic" onChange={handlechange}/>
        </Form.Group>
      

      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Enter name" name="name" onChange={handlechange}/>
      </Form.Group>

      <Form.Group className="mb-3" >
       
        <Form.Control type="password" placeholder="Enter password" name="password" onChange={handlechange}/>
      </Form.Group>
      <Form.Group className="mb-3" >
       
       <Form.Control type="text" placeholder="Enter Address" name="address"onChange={handlechange}/>
     </Form.Group>

     <Form.Group className="mb-3" >
       
       <Form.Control type="number" placeholder="Enter Contact Number" name="number" onChange={handlechange}/>
     </Form.Group>

     <Row className="mb-3" >
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Select defaultValue="Choose...">
            <option name="customer"  onChange={handlechange}>customer</option>
            <option name="Instructor"  onChange={handlechange}>Instructor</option>
            <option name="Supplier"  onChange={handlechange}>Supplier</option>
          </Form.Select>
        
       </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          
          <Form.Select defaultValue="Choose...">
            <option >Gender</option>
            <option name="male"  onChange={handlechange}>Male</option>
            <option name="female"  onChange={handlechange}>Female</option>
          </Form.Select>
        </Form.Group>

        
      </Row>

     
    

      
<div className='btn'>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
      </div>
      <br/>
      <div className='text'>
      Already have an account? <Link to='/signin'>Sign in</Link> 
      </div>
    </Form>
    </Card.Body>
    </Card>
    </div>
   
    </div>
    </div>
  )
}

export default SignUp
