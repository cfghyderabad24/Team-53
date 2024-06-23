// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FAQ from '../faq/FAQ.js'; // Import the FAQ component
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import c1 from '../assets/c1.png';
import c2 from '../assets/c2.png'
import './Home.css';

const Home = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted!');
    // You can add additional logic to handle form submission (e.g., API calls, state updates)
  };

  return (
    <Container>
      {/* Carousel Section */}
      <Row className="mt-4">
        <Col>
          <div className="carousel-container">
            <ResponsiveCarousel showThumbs={false} autoPlay infiniteLoop>
              <div>
                <img src={image1} alt="Slide 1" />
              </div>
              <div>
                <img src={image2} alt="Slide 2" />
              </div>
            </ResponsiveCarousel>
          </div>
        </Col>
      </Row>
      
      {/* Divider */}
      <hr className="divider" />
      
      {/* Cards and Mission Section */}
      <Row className="mt-4">
        <Col sm={6}>
          <Row>
            {/* Card 1 */}
            <Col xs={6}>
              <Card className="mb-3">
                <Card.Img variant="top" src={c1} />
              </Card>
            </Col>
            {/* Card 2 */}
            <Col xs={6}>
              <Card className="mb-3">
                <Card.Img variant="top" src={c2} />
              </Card>
            </Col>
          </Row>
        </Col>
        
        {/* Mission and Vision Section */}
        <Col sm={6}>
          <div className="paragraph-container">
            <h2>Jaldhaara Foundation</h2>
            <p>
              At Jaldhaara Foundation, we envision a world where every individual has access to clean and safe water. Our mission is to empower communities by implementing sustainable water solutions that promote health, education, and economic development. Through innovative projects and partnerships, we strive to create lasting change, ensuring that future generations can thrive with access to this fundamental resource.
            </p>
          </div>
        </Col>
      </Row>
      
      {/* FAQ Section */}
{/*       
      <hr className="divider" />
      <FAQ />
      
      <hr className="divider" />
      <Container className="feedback-form-container py-4 border border-dark">
        <Row>
          <Col>
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="3" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </Col>
        </Row>
      </Container> */}
    </Container>
  );
};

export default Home;
