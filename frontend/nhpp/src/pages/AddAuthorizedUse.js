import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import PMNavBar from '../components/PMNavBar';

const AddAuthorizedUseForm = () => {
  const [formData, setFormData] = useState({
    use: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/authorized_uses`, {
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
        alert('An error occurred while adding use. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while adding use.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <PMNavBar />
      <Row><h1>New Authorized Use</h1></Row>
      <Row>
        <p><span style={{color: "red"}}>* required</span></p>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Authorized Use:</Form.Label>
        <Form.Control name='use' placeholder='Enter description of use' value={formData.full_name} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Button type="submit">Add Authorized Use</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default AddAuthorizedUseForm;
