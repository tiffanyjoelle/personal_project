import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import PMNavBar from '../components/PMNavBar';

const AddRSOPage = () => {

  const token = 'Token ' + localStorage.getItem('token')

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    credentials: '',
    email: '',
    phone: '',
    alt_phone: '',
    consulting_firm: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/RSO`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(formData),
      });
      // console.log(JSON.stringify(formData))
      if (response.ok) {
        alert('RSO added successfully!')
        window.location.reload()
      } else {
        alert('An error occurred while adding RSO. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while adding RSO.')
      console.error(err)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <PMNavBar />
      <Row><h4>New Radiation Safety Officer</h4></Row>
      <Row>
        <p><span style={{color: "red"}}>* required</span></p>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> First Name:</Form.Label>
        <Form.Control name='first_name' placeholder='Enter first name' value={formData.first_name} onChange={handleChange}></Form.Control>
      </Form.Group>
  
      <br />
      <Form.Group>
        <Form.Label>Middle Name:</Form.Label>
        <Form.Control name='middle_name' placeholder='Enter middle name' value={formData.middle_name} onChange={handleChange}></Form.Control>
      </Form.Group>
   
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Last Name:</Form.Label>
        <Form.Control name='last_name' placeholder='Enter last name' value={formData.last_name} onChange={handleChange}></Form.Control>
      </Form.Group>

      <br />
      <Form.Group>
        <Form.Label>Credentials:</Form.Label>
        <Form.Control name='credentials' placeholder='Enter credentials' value={formData.credentials} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Email:</Form.Label>
        <Form.Control name='email' placeholder='example@email.com' value={formData.email} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Phone:</Form.Label>
        <Form.Control name='phone' placeholder='111-111-1111' value={formData.phone} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Alternate Phone:</Form.Label>
        <Form.Control name='alt_phone' placeholder='111-111-1111' value={formData.alt_phone} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Consulting Firm (if applicable):</Form.Label>
        <Form.Control name='consulting_firm' placeholder='Enter consulting firm' value={formData.consulting_firm} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Button type="submit">Add RSO</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default AddRSOPage;