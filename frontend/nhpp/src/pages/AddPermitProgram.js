import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import PMNavBar from '../components/PMNavBar';

const AddPermitProgramForm = () => {

  const token = 'Token ' + localStorage.getItem('token')

  const [formData, setFormData] = useState({
    title: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/permit_programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(formData),
      });
      // console.log(JSON.stringify(formData))
      if (response.ok) {
        alert('Program added successfully!')
        window.location.reload()
      } else {
        alert('An error occurred while adding program. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while adding program.')
      console.error(err)
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <PMNavBar />
      <Row><h4>New Permit Program</h4></Row>
      <Row>
        <p><span style={{color: "red"}}>* required</span></p>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Program:</Form.Label>
        <Form.Control name='title' placeholder='Enter program title and/or description' value={formData.use} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Button type="submit">Add Program</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default AddPermitProgramForm;
