import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import NavBar from '../components/NavBar';

const AddRSOForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    credentials: '',
    email: '',
    phone: '',
    alt_phone: '',
    consulting_firm: '',
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/RSO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      alert('RSO added successfully!');
    } catch (err) {
      alert('An error occurred while adding RSO.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <NavBar />
      <Row><h1>New Radiation Safety Officer</h1></Row>
      <Row>
    <Form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Middle Name:
        <input type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Last Name:
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Credentials:
        <input type="text" name="credentials" value={formData.credentials} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Alt Phone:
        <input type="text" name="alt_phone" value={formData.alt_phone} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Consulting Firm:
        <input type="text" name="consulting_firm" value={formData.consulting_firm} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Notes:
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>
      <br />
      <br />
      <Button type="submit">Add RSO</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default AddRSOForm;
