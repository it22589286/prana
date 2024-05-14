import React from 'react'
import { Card, Container } from 'react-bootstrap'
import Image from "./story.jpg";

const Story = () => {
  return (
    <div
    style={{
      height: "100vh",
      backgroundImage: `url(${Image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <Container>
      <Card style={{ backgroundColor: 'rgba(128, 128, 128, 0.7)',marginTop:"100px",width:"700px"}}>
           <Card.Header style={{textAlign:"center",fontFamily:"fantasy",height:"80px",fontSize:"50px",color:"white"}}>Our Story</Card.Header>
            <Card.Body  style={{fontFamily:"serif",color:"white"}}>Prana Yoga began as a humble vision, born out of a deep passion for holistic well-being and spiritual harmony. It all started with a simple intention – to create a nurturing space where individuals could embark on their journey towards physical, mental, and emotional wellness.

Our founders, driven by a shared love for yoga and mindfulness practices, envisioned a sanctuary that would not only offer exceptional yoga classes but also foster a sense of community and connection among like-minded individuals. They believed in the transformative power of yoga, not just as a physical exercise but as a pathway to inner peace, balance, and self-discovery.

Through dedication, perseverance, and unwavering commitment to their vision, Prana Yoga gradually evolved from a small studio into a thriving wellness hub, welcoming people from all walks of life. Our instructors, carefully selected for their expertise and passion, bring a wealth of knowledge and wisdom to every class, guiding students on a transformative journey of self-exploration and growth.

At Prana Yoga, we believe in the profound interconnectedness of mind, body, and spirit. We strive to create an inclusive and supportive environment where everyone feels empowered to explore their unique potential and embrace their authentic selves. Whether you're a seasoned yogi or stepping onto the mat for the first time, you'll find a warm welcome and a sense of belonging at Prana Yoga.

Our story is a testament to the transformative power of yoga and the boundless potential that lies within each of us. As we continue to grow and evolve, our commitment to spreading love, light, and healing remains unwavering. Join us on this journey of self-discovery, empowerment, and transformation – together, let's awaken the divine energy within and create a life of balance, joy, and fulfillment.






 </Card.Body>
          </Card>
      </Container>

     
    </div>
  )
}

export default Story
