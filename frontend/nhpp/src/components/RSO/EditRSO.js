import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';

const EditRSOForm = (props) => {
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    credentials: '',
    email: '',
    phone: '',
    alt_phone: '',
    consulting_firm: '',
  });

  useEffect(() => {
    if (props.rso) {
      const cleanedData = {
        first_name: props.rso.first_name || '',
        middle_name: props.rso.middle_name || '',
        last_name: props.rso.last_name || '',
        credentials: props.rso.credentials || '',
        email: props.rso.email || '',
        phone: props.rso.phone || '',
        alt_phone: props.rso.alt_phone || '',
        consulting_firm: props.rso.consulting_firm || '',
      };
      setEditFormData(cleanedData);
    }
  }, [props]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/RSO/${props.rso.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      const result = await response.json();
      // console.log(result)
      if (response.ok) {
        alert('RSO information updated successfully!')
        window.location.reload()
      } else {
        alert('An error occurred while updating RSO information. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while updating RSO information.');
      console.error(err)
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <p><span style={{color: "red"}}>* required</span></p>
      <Form onSubmit={handleEditSubmit}>
      <Form.Group>
        <Form.Label>Credentials:</Form.Label>
        <Form.Control name='credentials' value={editFormData.credentials} onChange={handleEditChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Email:</Form.Label>
        <Form.Control name='email' value={editFormData.email} onChange={handleEditChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Phone:</Form.Label>
        <Form.Control name='phone' value={editFormData.phone} onChange={handleEditChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Alternate Phone:</Form.Label>
        <Form.Control name='alt_phone' value={editFormData.alt_phone} onChange={handleEditChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Consulting Firm (if applicable):</Form.Label>
        <Form.Control name='consulting_firm' value={editFormData.consulting_firm} onChange={handleEditChange}></Form.Control>
      </Form.Group>
      <br />
      <Button type="submit">Update contact information</Button>
    </Form>
    </Row>
    </Container>
  );
};

export default EditRSOForm;
