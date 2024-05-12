import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import Image1 from "./aims.jpg";

const Aims = () => {
  return (
    <div
    style={{
      height: "100vh",
      backgroundImage: `url(${Image1})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
       <p style={{fontSize:"70px",fontFamily:"fantasy",color:"white"}}>Our Aims</p>
    <Container >
     
      <Row style={{ justifyContent: "space-between" }}>
        <Col>
          <Card style={{ backgroundColor: 'rgba(139, 190, 227, 0.7)'}}>
            <Card.Header style={{textAlign:"center",fontFamily:"fantasy"}}>Enhancing Customer Experience:</Card.Header>
            <Card.Body  style={{fontFamily:"serif"}}> At Prana Yoga, our aim is to provide a seamless and enriching experience for customers seeking to explore and engage with yoga practices. Through our web application, customers can discover a diverse range of yoga classes, workshops, and resources tailored to their preferences and skill levels. We strive to create a user-friendly platform that empowers individuals on their yoga journey, promoting physical wellness and mental well-being.</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ backgroundColor: 'rgba(139, 190, 227, 0.7)'}}>
          <Card.Header style={{textAlign:"center",fontFamily:"fantasy"}}>Facilitating Yoga Equipment Suppliers:</Card.Header>
            <Card.Body  style={{fontFamily:"serif"}}> Prana Yoga serves as a bridge between yoga equipment suppliers and practitioners by offering a marketplace for high-quality yoga products. Our platform enables suppliers to showcase their offerings to a targeted audience of yoga enthusiasts, instructors, and studio owners. Through seamless transactions and reliable delivery services, we aim to facilitate the procurement of essential yoga equipment, supporting the needs of both suppliers and practitioners alike.</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ backgroundColor: 'rgba(139, 190, 227, 0.7)'}}>
          <Card.Header style={{textAlign:"center",fontFamily:"fantasy"}}>Empowering Instructors:</Card.Header>
            <Card.Body style={{fontFamily:"serif"}}> We are committed to supporting yoga instructors by offering them a platform to showcase their expertise, connect with students, and manage their classes efficiently. Prana Yoga provides instructors with tools for scheduling, communication, and content delivery, allowing them to focus on delivering high-quality yoga instruction. By fostering a supportive community and providing valuable resources, we aim to empower instructors to thrive in their teaching practice.</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default Aims;
