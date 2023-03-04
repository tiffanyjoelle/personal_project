import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import NavBar from '../components/NavBar';

const EditRSOForm = () => {
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

  const [rsoInfo, setRSOInfo] = useState()
  let { rsoID } = useParams()

  useEffect( () => {
    async function getRSOInfo() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/RSO/${rsoID}`)
      const body = await response.json()
      setRSOInfo(body.result)
    }
    getRSOInfo()
  }, [])

  useEffect(() => {
    if (rsoInfo) {
      const cleanedData = {
        first_name: rsoInfo.first_name || '',
        middle_name: rsoInfo.middle_name || '',
        last_name: rsoInfo.last_name || '',
        credentials: rsoInfo.credentials || '',
        email: rsoInfo.email || '',
        phone: rsoInfo.phone || '',
        alt_phone: rsoInfo.alt_phone || '',
        consulting_firm: rsoInfo.consulting_firm || '',
      };
      setFormData(cleanedData);
    }
  }, [rsoInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/RSO/${rsoID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // console.log(JSON.stringify(formData))
      
      window.history.back()
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
      <Row><h1>Edit RSO Contact Information </h1></Row>
      <Row>
      <Form onSubmit={handleSubmit}>
        <br />
      <h3>For: {formData.first_name} {formData.middle_name} {formData.last_name}</h3>
      <p><span style={{color: "red"}}>* required</span></p>
      <Form.Group>
        <Form.Label>Credentials:</Form.Label>
        <Form.Control name='credentials' value={formData.credentials} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Email:</Form.Label>
        <Form.Control name='email' value={formData.email} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Phone:</Form.Label>
        <Form.Control name='phone' value={formData.phone} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Alternate Phone:</Form.Label>
        <Form.Control name='alt_phone' value={formData.alt_phone} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Consulting Firm (if applicable):</Form.Label>
        <Form.Control name='consulting_firm' value={formData.consulting_firm} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Button type="submit">Update contact information</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default EditRSOForm;
