import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddFeedbacks = () => {
  const navigate = useNavigate();

  //const Addfeedbacks = () => { const navigate = useNavigate()}
  //const addfeedback = () =>
  
  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/update.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '100px',
  };

  return (
    <div style={backgroundImageStyle}>
      <div style={{ textAlign: 'center' }}>
        <Button variant="secondary" style={{ marginTop: '-85px', marginBottom: '10px', width: '350px' }} onClick={() => navigate('/givefeedback')}>Add Feedbacks</Button>
        <br />
        <Button variant="secondary" style={{ width: '350px' }} onClick={() => navigate('/myfeedbacks')}>Edit or Delete Feedbacks</Button>
      </div>
    </div>
  );
};

export default AddFeedbacks;
