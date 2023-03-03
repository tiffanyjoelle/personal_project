import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import PMNavBar from '../components/PMNavBar';

const AddAUForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    credentials: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/authorized_users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // console.log(JSON.stringify(formData))
      if (response.ok) {
        const confirmed = window.confirm('AU added successfully!')
        if (confirmed) {
          window.history.back()
        }
      } else {
        alert('An error occurred while adding AU. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while adding AU.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <PMNavBar />
      <Row><h1>New Authorized User</h1></Row>
      <Row>
        <p><span style={{color: "red"}}>* required</span></p>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Full Name:</Form.Label>
        <Form.Control name='full_name' placeholder='Enter your first and last name' value={formData.full_name} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Credentials:</Form.Label>
        <Form.Control name='credentials' placeholder='Enter credentials' value={formData.credentials} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Button type="submit">Add Authorized User</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default AddAUForm;
