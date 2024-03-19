import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from '../imagefiles/signin.jpg'
import './Signin.css'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
 

const SignIn = () => {

  const navigate =useNavigate()
  const [data,setData] =useState({
    email:'',
    password:''
  });
  const handleSubmit =  async(event) =>{
    console.log(data)
    event.preventDefault();
    const {email,password} =data
    try{
      const {data} = await axios.post('/login',{
        email,
        password
      });
      if(data.error){
        toast.error(data.error)
      }else{
        setData({});
        navigate('/')

      }
    }
    catch(error){

    }
    
    
  }

  const handlechange =(event) =>{
    // console.log(event.target.name,event.target.value);
    setData({
       ...data,
       [event.target.name]:event.target.value
       
     })
   }
  
  return (
    <div className='hero' style={{backgroundImage:`url(${Image})`}}>
    <div className='container'>
      
        <div className='form'>
     <Card className='shadow-lg'style={{width:'600px'}}>
       <Card.Header className='mb-3'style={{backgroundColor:'orange',height:'60px'}}><h4 className='s'>Sign In</h4></Card.Header>
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
          <Button type="submit"  className='btn'>Sign in</Button>
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
