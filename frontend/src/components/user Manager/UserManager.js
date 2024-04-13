import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import{Container,Row,Col} from 'react-bootstrap'
import customer from '../imagefiles/customer.png'
import supplier from '../imagefiles/supplier.png'
import instructor from '../imagefiles/instructor.png'

const UserManager = () => {
    const navigate = useNavigate();
  return (
    <div className="">
       
     <Container style={{ marginTop: '5rem' }}>

     <Row className ="justify-content-center">

     <Col md={4}>

      <Card style={{ width: '18rem' , backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px'}}>
      <Card.Body className='text-center'> 
      <Card.Title>Customters</Card.Title>
      
        
        <Card.Img variant="top" src={customer}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}}  /> 
         
          <Button style={{marginLeft:'90px'}}  variant="primary"  onClick={()=>navigate('/customerData')}>Manage </Button>
        </Card.Body>
      </Card>
      </Col>
      <Col md={4}>

      <Card style={{ width: '18rem' , backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px'}}>
      <Card.Body className='text-center'> 
      <Card.Title>Instructors</Card.Title>
      
       
        <Card.Img variant="top" src={instructor}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}}  /> 
         
          <Button style={{marginLeft:'90px'}} variant="primary" onClick={()=>navigate('/instructorData')}>Manage </Button>
        </Card.Body>
      </Card>
      </Col>

      <Col md={4}>


      <Card style={{ width: '18rem' , backgroundColor: 'rgba(139, 190, 227, 0.7)', color: 'white',height:'200px'}}>
      <Card.Body className='text-center'> 
      <Card.Title>Suppliers</Card.Title>
      
        
        <Card.Img variant="top"src={supplier}  style={{ width: '100px', height: '100px' ,marginBottom:'5px'}}  /> 
         
          <Button style={{marginLeft:'90px'}}  variant="primary" onClick={()=>navigate('/supplierData')}>Manage </Button>
        </Card.Body>
      </Card>
      </Col>

      
      </Row>
      </Container>
    
    </div>
  )
}

export default UserManager
