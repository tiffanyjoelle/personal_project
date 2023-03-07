import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PMNavBar from "../components/PMNavBar";

function EditPermitForm() {

  const token = 'Token ' + localStorage.getItem('token')

  // states and params
  let { office_code } = useParams()
  const [permitInfo, setPermitInfo] = useState()
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

  const [programCodes, setProgramCodes] = useState([]);
  const [selectedProgramCodes, setSelectedProgramCodes] = useState([]);
  const [rso, setRSO] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [inspectionPriorities, setInspectionPriorities] = useState([]);
  const [authorizedUse, setAuthorizedUses] = useState([]);
  const [selectedAuthorizedUses, setSelectedAuthorizedUses] = useState([]);
  const [authorizedUser, setAuthorizedUsers] = useState([]);
  const [selectedAuthorizedUsers, setSelectedAuthorizedUsers] = useState([]);
  const [permitPrograms, setPermitPrograms] = useState([]);
  const [selectedPermitPrograms, setSelectedPermitPrograms] = useState([]);


  // useEffects and handleChanges

  const handleChange = (event) => {
    const { name, value } = event.target
    setPermitData({ ...permitData, [name]: value })
  }
  
  useEffect( () => {
    async function getPermitInfo() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/${office_code}/edit`, {
        headers: {
          'Authorization': token
        }
      })
      const body = await response.json()
      setPermitInfo(body.result)
    }
    getPermitInfo()
  }, [])

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
      });
    }
  }, [permitInfo]);
  
  useEffect(() => {
    if (permitInfo) {
      setSelectedProgramCodes(permitInfo.program_codes);
      setSelectedAuthorizedUsers(permitInfo.authorized_user);
      setSelectedAuthorizedUses(permitInfo.authorized_use);
      setSelectedMaterials(permitInfo.material);
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
    async function fetchRSOs() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/RSO`, {
        headers: {
          'Authorization': token
        }
      })
      const data = await response.json();
      setRSO(data.result)
    }
    fetchRSOs();
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

  useEffect(() => {
    async function fetchAuthorizedUses() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/authorized_uses`, {
        headers: {
          'Authorization': token
        }
      })
      const data = await response.json();
      setAuthorizedUses(data.result)
    }
    fetchAuthorizedUses();
  }, []);
  
  function handleAuthorizedUseSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthorizedUses(selectedValues)
  }

  useEffect(() => {
    async function fetchAuthorizedUsers() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/authorized_users`, {
        headers: {
          'Authorization': token
        }
      })
      const data = await response.json();
      setAuthorizedUsers(data.result)
    }
    fetchAuthorizedUsers();
  }, []);
  
  function handleAuthorizedUserSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthorizedUsers(selectedValues)
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
      city: permitData.city,
      state_abbrev: permitData.state_abbrev,
      office_code: permitData.office_code,
      permit_num: permitData.permit_num,
      docket_num: permitData.docket_num,
      exp_date: permitData.exp_date,
      program_codes: selectedProgramCodes,
      inspection_priority: permitData.inspection_priority,
      primary_rso: permitData.primary_rso,
      material: selectedMaterials,
      authorized_use: selectedAuthorizedUses,
      authorized_user: selectedAuthorizedUsers,
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
      window.location.href = `/permit/${permitInfo.office_code}`
    } else {
        alert('An error occurred while updating permit. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while updating.')
      console.error(err)
    }
  }

  return (
    <div>
      <Container>
      <PMNavBar />
      <Row>
    <h1>Edit RAM Permit# {permitData.permit_num}</h1>
      <hr />
      <p><span style={{color: "red"}}>* required</span><br /><br />
      Note: For fields with multiple selection options, be sure to hold the Ctrl (PC) or Command (Mac) key down while selecting multiple
items. If you click on an item in the list while not holding the key down, that item will
be selected and all of the other selections made will be removed. 
      </p>
      </Row>
      <hr />
      <br />
    <Form>
      <Row>
        <Col>
        <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Facility City:</Form.Label>
        <Form.Control name='city' placeholder='Enter City' value={permitData.city} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Facility State Abbreviation:</Form.Label>
        <Form.Control name='state_abbrev' placeholder='ex. AL' value={permitData.state_abbrev} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Office Code:</Form.Label>
        <Form.Control name='office_code' placeholder='Enter facility office code' value={permitData.office_code} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Permit Number:</Form.Label>
        <Form.Control name='permit_num' placeholder='ex. 11-11111-11' value={permitData.permit_num} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
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
      </Col>
      <Col>
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Radiation Safety Officer:</Form.Label>
        <Form.Select id="primary_rso" name='primary_rso' onChange={handleChange}>{rso.map(rso => (
          <option key={rso.id} value={rso.id}>{rso.last_name}, {rso.first_name}</option>
        ))}</Form.Select>
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
      <br />
      <Form.Group>
        <Form.Label>Notable Program(s):</Form.Label>
        <Form.Select id="permit_program" name='permit_program' multiple value={selectedPermitPrograms} onChange={handlePermitProgramSelect}>{permitPrograms.map(program => (
          <option key={program.id} value={program.id}>{program.title}</option>
        ))}
        </Form.Select>
      </Form.Group>
      <br />
      </Col>
      </Row>
      <Row>
      <Form.Group>
        <Form.Label>Material(s):</Form.Label>
        <Form.Select id="material" name='material' multiple value={selectedMaterials} onChange={handleMaterialSelect}>{materials.map(material => (
          <option key={material.id} value={material.id}>{material.source}, {material.form}, {material.amount_of_source} </option>
        ))}
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Authorized Use(s):</Form.Label>
        <Form.Select id="authorized_use" name='authorized_use' multiple value={selectedAuthorizedUses} onChange={handleAuthorizedUseSelect}>{authorizedUse.map(use => (
          <option key={use.id} value={use.id}>{use.use}</option>
        ))}
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label>Authorized User(s):</Form.Label>
        <Form.Select id="authorized_user" name='authorized_user' value={selectedAuthorizedUsers} multiple onChange={handleAuthorizedUserSelect}>{authorizedUser.map(user => (
          <option key={user.id} value={user.id}>{user.full_name}, {user.credentials}</option>
        ))}
        </Form.Select>
      </Form.Group>
      </Row>
      <Row>
        <Col>
        <hr />
        <Button onClick={handleSubmit}>Update Permit</Button>
        </Col>
      </Row>
      </Form>
    </Container>
    </div>
  );
}

export default EditPermitForm;