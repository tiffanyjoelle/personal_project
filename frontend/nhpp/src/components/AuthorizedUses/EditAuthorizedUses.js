import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function EditAuthorizedUsesForm(props) {

  // states and params
  let { office_code } = useParams()
  const [permitInfo, setPermitInfo] = useState(props.editPermitInfo)
  const [permitData, setPermitData] = useState({
    authorized_use: [],
  });

  const [authorizedUse, setAuthorizedUses] = useState([]);
  const [selectedAuthorizedUses, setSelectedAuthorizedUses] = useState([]);
  

  // useEffects and handleChanges
  

  useEffect(() => {
    if (permitInfo) {
      setSelectedAuthorizedUses(permitInfo.authorized_use);
    }
  }, [permitInfo]);

  useEffect(() => {
    async function fetchAuthorizedUses() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/authorized_uses`)
      const data = await response.json();
      setAuthorizedUses(data.result)
    }
    fetchAuthorizedUses();
  }, []);
  
  function handleAuthorizedUseSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthorizedUses(selectedValues)
  }

  // handle submit
  async function handleSubmit(event) {
    event.preventDefault();
    //compile data to send
    const data = {
      authorized_use: selectedAuthorizedUses,
    }
    const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/${office_code}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    // console.log(result)
    window.location.reload()
  }

  return (
    <div>
      {selectedAuthorizedUses &&
    <Form>
      <Form.Group>
        <Form.Label>Authorized Use(s):</Form.Label>
        <Form.Select id="authorized_use" name='authorized_use' multiple value={selectedAuthorizedUses} onChange={handleAuthorizedUseSelect}>{authorizedUse.map(use => (
          <option key={use.id} value={use.id}>{use.use}</option>
        ))}
        </Form.Select>
      </Form.Group>
        <hr />
        <Button onClick={handleSubmit}>Update Authorized Uses</Button>
      </Form>
    }
    </div>
  );
}

export default EditAuthorizedUsesForm;