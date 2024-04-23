import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

const ResetPassword = () => {

   
    
    
    
       
        
          const navigate =useNavigate();
          const {id,token} = useParams();
          const [data,setData] =useState({
            passwrod:'',
            
          });
          const handleSubmit =  async(event) =>{
           
            event.preventDefault();
            const {passwrod} =data
            try{
              const {data} = await axios.post(`/reset-password/${id}/${token}`,{
                passwrod,
            
              }).then((response)=>{
        
                
               navigate('/signin')
             //   toast.success('login success')
             /*   console.log(response);
                 if(response.data.role ==="customer"){
                  navigate('/dashboard')
                }else if(response.data.role ==="Instructor"){
                  navigate('/instructor')
                }else if(response.data.role ==="Supplier"){
                  navigate('/supplier')
                }else if(response.data.role ==="admin"){
                  navigate('/admin')
                }
               
                localStorage.setItem("user",JSON.stringify(response.data))*/
              })
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
         <Card className='shadow-lg'style={{width:'600px',backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
           <Card.Header className='mb-3'style={{backgroundColor:'orange',height:'60px',textAlign:"center"}}><h4 >Update Password</h4></Card.Header>
            <Card.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="passwrod" name="password" onChange={handlechange} />
            </Col>
          </Form.Group>
    
          
         
    
          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit"  className='btn'>Sign in</Button>
            </Col>
          </Form.Group>
         
        </Form>
        </Card.Body>
        </Card>
        
          </div>
        </div>
        </div>
      
    
    
  )
}

export default ResetPassword
