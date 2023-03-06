import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

function EditAUForm(props) {

  // states and params

  let { office_code } = useParams()
  // state to hold all of the permit info from db
  const [permitInfo, setPermitInfo] = useState(props.editPermitInfo)

  // for some reason, the db isn't letting me PUT w only authorized users, so adding all fields
  // state to hold edited data to send in PUT request
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

  // state to get list of all available AUs in db
  const [authorizedUser, setAuthorizedUsers] = useState([]);
  // state to hold multiple selected values for PUT request
  const [selectedAuthorizedUsers, setSelectedAuthorizedUsers] = useState([]);
  
  // useEffects and handleChanges

  // reactively set formData state with any change in input if applicable
  const handleChange = (event) => {
    const { name, value } = event.target
    setPermitData({ ...permitData, [name]: value })
  }

  // automatically set default data for PUT request with current permit info
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
        authorized_use: permitInfo.authorized_use,
        material: permitInfo.material,
        permit_program: permitInfo.permit_program,
      });
      setSelectedAuthorizedUsers(permitInfo.authorized_user);
    }
  }, [permitInfo]);

  // grab all of db's available AUs
  useEffect(() => {
    async function fetchAuthorizedUsers() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/authorized_users`)
      const data = await response.json();
      setAuthorizedUsers(data.result)
    }
    fetchAuthorizedUsers();
  }, []);
  
  // store selected values from form
  function handleAuthorizedUserSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthorizedUsers(selectedValues)
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
      authorized_use: permitData.authorized_use,
      authorized_user: selectedAuthorizedUsers,
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
      alert('Permit AUs updated successfully!');
      window.location.reload()
    } else {
        alert('An error occurred while updating permit AUs. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while updating permit AUs.')
      console.error(err)
    }
  }

  return (
    <div>
    <Form>
      <Form.Group>
        <Form.Label>Authorized User(s):</Form.Label>
        <Form.Select id="authorized_user" name='authorized_user' value={selectedAuthorizedUsers} multiple onChange={handleAuthorizedUserSelect}>{authorizedUser.map(user => (
          <option key={user.id} value={user.id}>{user.full_name}, {user.credentials}</option>
        ))}
        </Form.Select>
      </Form.Group>
        <Button onClick={handleSubmit}>Update Permit</Button>
      </Form>
    </div>
  );
}

export default EditAUForm;