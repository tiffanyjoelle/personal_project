import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function EditAuthorizedUsesForm(props) {

  // states and params
  let { office_code } = useParams()
  const [permitInfo, setPermitInfo] = useState(props.editPermitInfo)

  // for some reason, the db isn't letting me PUT w only authorized uses, so adding all fields
  const [permitData, setPermitData] = useState({
    city: "",
    state_abbrev: "",
    office_code: "",
    permit_num: "",
    docket_num: "",
    exp_date: "",
    program_codes: [],
    inspection_priority: "",
    primary_rso: "",
    material: [],
    authorized_use: [],
    authorized_user: [],
    permit_program: [],
  });

  const [authorizedUse, setAuthorizedUses] = useState([]);
  const [selectedAuthorizedUses, setSelectedAuthorizedUses] = useState([]);


  // useEffects and handleChanges

  const handleChange = (event) => {
    const { name, value } = event.target
    setPermitData({ ...permitData, [name]: value })
  }

  useEffect(() => {
    if (permitInfo) {
      setPermitData({
        city: permitInfo.city,
        state_abbrev: permitInfo.state_abbrev,
        office_code: permitInfo.office_code,
        permit_num: permitInfo.permit_num,
        docket_num: permitInfo.docket_num,
        exp_date: permitInfo.exp_date,
        inspection_priority: permitInfo.inspection_priority,
        primary_rso: permitInfo.primary_rso,
        program_codes: permitInfo.program_codes,
        authorized_user: permitInfo.authorized_user,
        material: permitInfo.material,
        permit_program: permitInfo.permit_program,
      });
      setSelectedAuthorizedUses(permitInfo.authorized_use);
    }
  }, [permitInfo]);

  useEffect(() => {
    async function fetchAuthorizedUses() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/authorized_uses`)
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
    try {
    //compile data to send
    const data = {
      city: permitData.city,
      state_abbrev: permitData.state_abbrev,
      office_code: permitData.office_code,
      permit_num: permitData.permit_num,
      docket_num: permitData.docket_num,
      exp_date: permitData.exp_date,
      program_codes: permitData.program_codes,
      inspection_priority: permitData.inspection_priority,
      primary_rso: permitData.primary_rso,
      material: permitData.material,
      authorized_use: selectedAuthorizedUses,
      authorized_user: permitData.authorized_user,
      permit_program: permitData.permit_program,
    }
    const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/${office_code}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    // console.log(result)
    if (response.ok) {
      alert('Permit authorized uses updated successfully!');
      window.location.reload()
    } else {
        alert('An error occurred while updating permit authorized uses. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while updating permit authorized uses.')
      console.error(err)
    }
  }

  return (
    <div>
    <Form>
      <Form.Group>
        <Form.Label>Authorized Use(s):</Form.Label>
        <Form.Select id="authorized_use" name='authorized_use' multiple value={selectedAuthorizedUses} onChange={handleAuthorizedUseSelect}>{authorizedUse.map(use => (
          <option key={use.id} value={use.id}>{use.use}</option>
        ))}
        </Form.Select>
      </Form.Group>
        <Button onClick={handleSubmit}>Update Permit</Button>
      </Form>
    </div>
  );
}

export default EditAuthorizedUsesForm;