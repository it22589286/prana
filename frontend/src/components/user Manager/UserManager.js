import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const UserManager = () => {
    const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center ">
       <div className="d-flex justify-content-around">

      <Card style={{ width: '18rem' ,margin: '10px'}}>
      <Card.Body className='text-center'> 
      <Card.Title>Customters</Card.Title>
      
        
        <Card.Img variant="top" src="holder.js/100px180" /> 
         
          <Button variant="primary"  onClick={()=>navigate('/customerData')}>Go </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem',margin: '10px' }}>
      <Card.Body className='text-center'> 
      <Card.Title>Instructors</Card.Title>
      
       
        <Card.Img variant="top" src="holder.js/100px180" /> 
         
          <Button variant="primary" onClick={()=>navigate('/instructorData')}>Go </Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem',margin: '10px' }}>
      <Card.Body className='text-center'> 
      <Card.Title>Suppliers</Card.Title>
      
        
        <Card.Img variant="top" src="holder.js/100px180" /> 
         
          <Button variant="primary" onClick={()=>navigate('/supplierData')}>Go </Button>
        </Card.Body>
      </Card>
    </div>
    </div>
  )
}

export default UserManager
