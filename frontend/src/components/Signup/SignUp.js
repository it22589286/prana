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

  const [data,setData] =useState({
    email:'',
    nic:'',
    name:'',
    password:'',
    number:'',
    role:'',
    gender:''
  });

  const handleSubmit = async(event) =>{
    console.log(data)
    event.preventDefault();
    const {email,nic,name,password,number,role,gender} =data
    try{
      const {data} =await axios.post('/register',{email,nic,name,password,number,role,gender})
      if(data.error){
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success('login ok')
        navigate('/signin')

      }
    }catch (error){
      console.log(error)

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
       
       <Form.Control type="number" placeholder="Enter Contact Number" name="number" onChange={handlechange}/>
     </Form.Group>

     <Row className="mb-3" >
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Select defaultValue="Choose..." name="role" onChange={handlechange} value={data.role} >
            <option >Role</option>
            <option value="customer" >customer</option>
            <option value="Instructor">Instructor</option>
            <option value="Supplier">Supplier</option>
          </Form.Select>
        
       </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          
          <Form.Select defaultValue="Choose..." name="gender" onChange={handlechange} value={data.gender}>
            
            <option value="male" >Male</option>
            <option value="female" >Female</option>
          </Form.Select>
        </Form.Group>

        
      </Row>

    

     
    

      
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
