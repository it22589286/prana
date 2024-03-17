import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Signup.css';
import { Link } from 'react-router-dom';
const SignUp = () => {
  return (
    <div className='container' >
        <div className='form'>
    <p>Sign Up</p> 
    <Form>
      
        <Form.Group className="mb-3"  controlId="formGridEmail">
        
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPassword">
        
          <Form.Control type="text" placeholder="Enter nic" />
        </Form.Group>
      

      <Form.Group className="mb-3" controlId="formGridAddress1">
        
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
       
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress2">
       
       <Form.Control type="text" placeholder="Enter Address" />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formGridAddress2">
       
       <Form.Control type="number" placeholder="Enter Contact Number" />
     </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
         
          <Form.Control type="number" placeholder='Enter height (cm)'/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
         
          <Form.Control type="number" placeholder='Enter weight (kg)'/>
        </Form.Group>
      </Row>
      <Row className="mb-3" >
        <Form.Group as={Col} controlId="formGridCity">
         
         <Form.Control type="date" placeholder='Enter Birthday'/>
       </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          
          <Form.Select defaultValue="Choose...">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </Form.Select>
        </Form.Group>

        
      </Row>

      
<div className='btn'>
      <Button variant="primary" type="submit">
        Register
      </Button>
      </div>
      <br/>
      <div className='text'>
      Already have an account? <Link to='/signin'>Sign in</Link> 
      </div>
    </Form>
    </div>
   
    </div>
  )
}

export default SignUp
