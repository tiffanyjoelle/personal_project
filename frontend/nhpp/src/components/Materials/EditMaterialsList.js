import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function EditMaterialsForm(props) {

  const token = 'Token ' + localStorage.getItem('token')

  // states and params
  let { office_code } = useParams()
  const [permitInfo, setPermitInfo] = useState(props.editPermitInfo)
  const [permitData, setPermitData] = useState({
    material: [],
  });

  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  // useEffects and handleChanges

  useEffect(() => {
    if (permitInfo) {
      setSelectedMaterials(permitInfo.material);
    }
  }, [permitInfo]);

  useEffect(() => {
    async function fetchMaterials() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/materials`, {
        headers: {
          'Authorization': token
        }
      })
      const data = await response.json();
      setMaterials(data.result)
    }
    fetchMaterials();
  }, []);
  
  function handleMaterialSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedMaterials(selectedValues)
  }

  // handle submit
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      //compile data to send
      const data = {
        material: selectedMaterials,
      }
      const base_url = process.env.REACT_APP_BASE_URL
        const response = await fetch(`http://${base_url}/api/${office_code}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
      // console.log(result)
      if (response.ok) {
        alert('Permit materials updated successfully!')
        window.location.reload()
      } else {
        alert('An error occurred while updating permit materials Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while updating permit materials.');
      console.error(err)
    }
  }

  return (
    <div>
      {selectedMaterials &&
    <Form>
      <Form.Group>
        <Form.Label>Material(s):</Form.Label>
        <Form.Select id="material" name='material' multiple value={selectedMaterials} onChange={handleMaterialSelect}>{materials.map(material => (
          <option key={material.id} value={material.id}>{material.source}, {material.form}, {material.amount_of_source} </option>
        ))}
        </Form.Select>
      </Form.Group>
      <br />
        <Button onClick={handleSubmit}>Update Materials</Button>
      </Form>
}
    </div>
  );
}

export default EditMaterialsForm;