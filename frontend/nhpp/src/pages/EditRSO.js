import React, { useState, useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
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
    notes: '',
  });

  const [rsoInfo, setRSOInfo] = useState()
  let { rsoID } = useParams()

  useEffect( () => {
    async function getRSOInfo() {
      // const base_url = process.env.REACT_APP_BASE_URL
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
        notes: rsoInfo.notes || '',
      };
      setFormData(cleanedData);
    }
  }, [rsoInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://127.0.0.1:8000/api/RSO/${rsoID}`, {
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
    <form onSubmit={handleSubmit}>
      <label>
        Name: {formData.first_name} {formData.middle_name} {formData.last_name}
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
      <Button type="submit">Update contact information</Button>
    </form>
    </Row>
    </Container>
  );
};

export default EditRSOForm;
