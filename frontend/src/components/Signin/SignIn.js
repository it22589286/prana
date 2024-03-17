import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from '../imagefiles/signin.jpg'
import './Signin.css'


const SignIn = () => {

  const [signIn,setSignIn] =useState();
  const handleSubmit = (event) =>{
    console.log(signIn)
    event.preventDefault();
    
  }

  const handlechange =(event) =>{
    // console.log(event.target.name,event.target.value);
    setSignIn({
       ...signIn,
       [event.target.name]:event.target.value
       
     })
   }
  
  return (
    <div className='hero' style={{backgroundImage:`url(${Image})`}}>
    <div className='container'>
      
        <div className='form'>
     <Card className='shadow-lg'>
       <Card.Header className='mb-3'><h4>Sign In</h4></Card.Header>
        <Card.Body>
      <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="Email" name="email" onChange={handlechange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="password" placeholder="Password" name="password" onChange={handlechange} />
        </Col>
      </Form.Group>
      
     

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={handleSubmit}>Sign in</Button>
        </Col>
      </Form.Group>
      <br/>
      <p>OR</p>
      <br/>
      <p>you do not have an account?<Link to="/signup">Sign Up</Link></p>
    </Form>
    </Card.Body>
    </Card>
    
      </div>
    </div>
    </div>
  )
}

export default SignIn
