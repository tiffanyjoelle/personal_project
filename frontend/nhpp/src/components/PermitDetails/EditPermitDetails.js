import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function EditPermitDetailsForm(props) {

  const token = 'Token ' + localStorage.getItem('token')

  // states and params
  let { office_code } = useParams()
  const [permitInfo, setPermitInfo] = useState(props.editPermitInfo)
  const [permitData, setPermitData] = useState({
    docket_num: "",
    exp_date: "",
    program_codes: [],
    inspection_priority: "",
    permit_program: [],
  });

  const [programCodes, setProgramCodes] = useState([]);
  const [selectedProgramCodes, setSelectedProgramCodes] = useState([]);
  const [inspectionPriorities, setInspectionPriorities] = useState([]);
  const [permitPrograms, setPermitPrograms] = useState([]);
  const [selectedPermitPrograms, setSelectedPermitPrograms] = useState([]);

  // useEffects and handleChanges

  const handleChange = (event) => {
    const { name, value } = event.target
    setPermitData({ ...permitData, [name]: value })
  }
  

  useEffect(() => {
    if (permitInfo) {
      setPermitData({
        docket_num: permitInfo.docket_num,
        exp_date: permitInfo.exp_date,
        inspection_priority: permitInfo.inspection_priority,
      })
      setSelectedProgramCodes(permitInfo.program_codes)
      setSelectedPermitPrograms(permitInfo.permit_program);
    }
  }, [permitInfo]);
  
  useEffect(() => {
    async function fetchInspectionPriorities() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/inspection_priorities`, {
        headers: {
          'Authorization': token
        }
      })
      const data = await response.json();
      setInspectionPriorities(data.result)
    }
    fetchInspectionPriorities();
  }, []);

  useEffect(() => {
    async function fetchProgramCodes() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/program_codes`, {
        headers: {
          'Authorization': token
        }
      })
      const data = await response.json();
      setProgramCodes(data.result)
    }
    fetchProgramCodes();
  }, []);
  
  function handleProgramCodeSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedProgramCodes(selectedValues)
  }

  useEffect(() => {
    async function fetchPermitPrograms() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/permit_programs`, {
        headers: {
          'Authorization': token
        }
      })
      const data = await response.json();
      setPermitPrograms(data.result)
    }
    fetchPermitPrograms();
  }, []);
  
  function handlePermitProgramSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedPermitPrograms(selectedValues)
  }

  // handle submit
  async function handleSubmit(event) {
    event.preventDefault();
    try {
    //compile data to send
      const data = {
        docket_num: permitData.docket_num,
        exp_date: permitData.exp_date,
        program_codes: selectedProgramCodes,
        inspection_priority: permitData.inspection_priority,
        permit_program: selectedPermitPrograms,
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
        alert('Details updated successfully!')
        window.location.reload()
      } else {
        alert('An error occurred while updating details. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while updating details.');
      console.error(err)
    }
  }

  return (
    <div>
      <Container>
      <p><span style={{color: "red"}}>* required</span></p>
    <Form>
      <Form.Group>
        <Form.Label>Docket Number:</Form.Label>
        <Form.Control name='docket_num' placeholder='ex. 111-11111' value={permitData.docket_num} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Permit Expiration Date:</Form.Label>
        <Form.Control name='exp_date' placeholder='YYYY-MM-DD' value={permitData.exp_date} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Inspection Priority:</Form.Label>
        <Form.Select id="inspection_priority" name='inspection_priority' onChange={handleChange}>{inspectionPriorities.map(priority => (
          <option key={priority.id} value={priority.id}>{priority.priority_num}</option>
        ))}
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Program Code(s):</Form.Label>
        <Form.Select id="program_codes" name='program_codes' multiple value={selectedProgramCodes} onChange={handleProgramCodeSelect}>{programCodes.map(programCode => (
          <option key={programCode.id} value={programCode.id}>{programCode.code}</option>
        ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Notable Program(s):</Form.Label>
        <Form.Select id="permit_program" name='permit_program' multiple value={selectedPermitPrograms} onChange={handlePermitProgramSelect}>{permitPrograms.map(program => (
          <option key={program.id} value={program.id}>{program.title}</option>
        ))}
        </Form.Select>
      </Form.Group>
        <Button onClick={handleSubmit}>Update Permit</Button>
      </Form>
    </Container>
    </div>
  );
}

export default EditPermitDetailsForm;