import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './Signup.css';
import { Link } from 'react-router-dom';
import Image from '../imagefiles/register.jpg'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate =useNavigate()

  const [user,setUser] =useState({
    email:'',
    nic:'',
    name:'',
    password:'',
    address:'',
    number:''
  });

  const handleSubmit = async(event) =>{
    console.log(user)
    event.preventDefault();
    const {email,nic,name,password,address,number} =user
    try{
      const {user} =await axios.post('/register',{email,nic,name,password,address,number})
      if(user.error){
        toast.error(user.error)
      }
      else{
        setUser({})
        toast.success('login ok')
        navigate('/')

      }
    }catch (error){
      console.log(error)

    }
    
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

    

     
    

      
<div className='btn'>
      <Button variant="primary" type="submit" >
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
