import React, { useState } from 'react';
import { Container, Row, Form, Button, Alert } from 'react-bootstrap';

const AddAUForm = () => {

  // state to hold form inputs to send in POST request
  const [formData, setFormData] = useState({
    full_name: '',
    credentials: '',
  });

  // form submission POST request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/authorized_users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // console.log(JSON.stringify(formData))
      const result = await response.json();
      // console.log(result)
      if (response.ok) {
        alert('AU added successfully!')
        window.location.reload()
      } else {
        alert('An error occurred while adding AU. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while adding AU.')
      console.error(err)
    }
  };

  // reactively set formData state with any change in input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row><h4>New Authorized User</h4></Row>
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
