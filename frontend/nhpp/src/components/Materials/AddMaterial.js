import React, { useState } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';

function AddMaterialForm () {

  const [formData, setFormData] = useState({
    source: '',
    form: '',
    amount_of_source: '',
  });

  const handleAddMaterialSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/materials`, {
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
          window.location.reload()
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
      <Row><h4>New Material</h4></Row>
      <Row>
        <p><span style={{color: "red"}}>* required</span></p>
    <Form onSubmit={handleAddMaterialSubmit}>
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Source:</Form.Label>
        <Form.Control name='source' placeholder='Enter byproduct, source, and/or special nuclear material' value={formData.source} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Form:</Form.Label>
        <Form.Control name='form' placeholder='Enter chemical and/or physical form' value={formData.form} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Amount of Source:</Form.Label>
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
