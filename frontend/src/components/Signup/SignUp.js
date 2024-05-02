import React, { useEffect, useState } from 'react'
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
    gender:'',
    attendance:0
  });
  const [showPassword, setShowPassword] = useState(false);

  

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
        toast.success('Regisration Successfully completed')
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='hero' style={{backgroundImage:`url(${Image})`}}>
    <div className='container'  >
        <div className='form'>
    <Card className='shadow-lg'style={{backgroundColor: 'rgba(255, 255, 255, 0.7)',width:'600px'}}>
       <Card.Header className='mb-3'style={{backgroundColor:'orange',height:'60px', textAlign:"center",}}><h4>Register</h4></Card.Header>
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
   <Form.Group as={Row} className="mb-3">
   <Form.Label column sm={2}>NIC</Form.Label>
   <Col sm={10}>
          <Form.Control type="text" placeholder="Enter nic" name="nic" onChange={handlechange}/>
          </Col>
        </Form.Group>
      

      <Form.Group className="mb-3"  as={Row}>
      <Form.Label column sm={2}>Name</Form.Label>
         <Col sm={10}>
        <Form.Control type="text" placeholder="Enter name" name="name" onChange={handlechange}/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={8}>
          <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" name="password" onChange={handlechange} />
        </Col>
        <Col sm={2}>
                    <Button variant="outline-secondary" onClick={togglePasswordVisibility} style={{ marginLeft: "10px" }}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </Col>
      </Form.Group>
     

     <Form.Group className="mb-3 " as={Row} >

     <Form.Label column sm={2}>Number</Form.Label>
         <Col sm={10}>
       
       <Form.Control type="number" placeholder="Enter Contact Number" name="number" onChange={handlechange}/>
       </Col>
     </Form.Group>

     <Row className="mb-3" >
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Select defaultValue="Choose..." name="role" onChange={handlechange} value={data.role} required >
            <option >Role</option>
            <option value="customer" >customer</option>
            <option value="Instructor">Instructor</option>
            <option value="Supplier">Supplier</option>
          </Form.Select>
        
       </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          
          <Form.Select defaultValue="Choose..." name="gender" onChange={handlechange} value={data.gender} required>
          <option >Gender</option>
            <option value="male" >Male</option>
            <option value="female" >Female</option>
          </Form.Select>
        </Form.Group>

        
      </Row>

    

     
    

      
<div className='btn'>
      <Button variant="primary" type="submit" style={{marginRight:"300px"}}>
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
