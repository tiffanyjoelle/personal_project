import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap"

function RSONotes(props) {

  const token = 'Token ' + localStorage.getItem('token')

  const [editFormData, setEditFormData] = useState({
    notes: '',
  });

  useEffect(() => {
    if (props.rso) {
      const cleanedData = {
        notes: props.rso.notes || '',
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
          'Authorization': token
        },
        body: JSON.stringify(editFormData),
      });
      const result = await response.json();
      // console.log(result)
      if (response.ok) {
        alert('Notes updated successfully!')
        window.location.reload()
      } else {
        alert('An error occurred adding/updating notes. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while addiing/updating notes.');
      console.error(err)
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <div>
        <Form onSubmit={handleEditSubmit}>
      <Form.Group>
        <Form.Label>Notes:
          <br /> **viewable only by NHPP Program Managers</Form.Label>
        <Form.Control name='notes' value={editFormData.notes} onChange={handleEditChange}></Form.Control>
      </Form.Group>
      <Button type="submit">Add/update notes</Button>
    </Form>
    </div>
  )
}

export default RSONotes