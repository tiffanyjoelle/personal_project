import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, } from 'react-bootstrap';

function EditAUForm(props) {

  // states and params
  let { office_code } = useParams()
  const [permitInfo, setPermitInfo] = useState(props.editPermitInfo)
  const [permitData, setPermitData] = useState({
    authorized_user: [],
  });

  const [authorizedUser, setAuthorizedUsers] = useState([]);
  const [selectedAuthorizedUsers, setSelectedAuthorizedUsers] = useState([]);
  

  // useEffects and handleChanges
  

  useEffect(() => {
    if (permitInfo) {
      setSelectedAuthorizedUsers(permitInfo.authorized_user);
    }
  }, [permitInfo]);


  useEffect(() => {
    async function fetchAuthorizedUsers() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/authorized_users`)
      const data = await response.json();
      setAuthorizedUsers(data.result)
    }
    fetchAuthorizedUsers();
  }, []);
  
  function handleAuthorizedUserSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthorizedUsers(selectedValues)
  }


  // handle submit
  async function handleSubmit(event) {
    event.preventDefault();
    //compile data to send
    const data = {
      authorized_user: selectedAuthorizedUsers,
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
      {selectedAuthorizedUsers &&
    <Form>
      <Form.Group>
        <Form.Label>Authorized User(s):</Form.Label>
        <Form.Select id="authorized_user" name='authorized_user' value={selectedAuthorizedUsers} multiple onChange={handleAuthorizedUserSelect}>{authorizedUser.map(user => (
          <option key={user.id} value={user.id}>{user.full_name}, {user.credentials}</option>
        ))}
        </Form.Select>
      </Form.Group>
        <hr />
        <Button onClick={handleSubmit}>Update Authorized Users</Button>
      </Form>
}
    </div>
  );
}

export default EditAUForm;