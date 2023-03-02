import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import PMNavBar from '../components/PMNavBar';

const AddMaterialForm = () => {
  const [formData, setFormData] = useState({
    source: '',
    form: '',
    amount_of_source: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // console.log(JSON.stringify(formData))
      if (response.ok) {
        const confirmed = window.confirm('Material added successfully!')
        if (confirmed) {
          window.history.back()
        }
      } else {
        alert('An error occurred while adding material. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while adding material.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <PMNavBar />
      <Row><h1>New Material</h1></Row>
      <Row>
        <p><span style={{color: "red"}}>* required</span></p>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Source:</Form.Label>
        <Form.Control name='source' placeholder='Enter byproduct, source, and/or special nuclear material' value={formData.source} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Form:</Form.Label>
        <Form.Control name='form' placeholder='Enter chemical and/or physical form' value={formData.form} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Amount of Source:</Form.Label>
        <Form.Control name='amount_of_source' placeholder='Maximum amount permittee may posses at any one time under permit' value={formData.amount_of_source} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Button type="submit">Add Material</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default AddMaterialForm;
