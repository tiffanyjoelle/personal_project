import { Link, redirect } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap';

function FacilityRAM(props) {

  function createAuthorizedUsesList() {
    return (
      <div>
        <h3>Authorized Uses:</h3>
        <ul>
        {props.permitInfo.authorized_use.map((use) => (
          <div key={use.id}>
            <li>{use.use}</li>
          </div>
        ))}
        </ul>
      </div>
    );
  }

  function createAuthorizedUsersList() {
    if (props.permitInfo.authorized_user.length > 0) {
      return (
        <div>
          <h3>Authorized Users:</h3>
          <ul>
          {props.permitInfo.authorized_user.map((user) => (
            <div key={user.id}>
              <li>{user.full_name}, {user.credentials}</li>
            </div>
          ))}
          </ul>
        </div>
      )
    }
  }

  function createProgramCodeList() {
    return (
      <div>
        {props.permitInfo.program_codes.map((item) => (
          <div key={item.id}>
            <li>{item.code}</li>
          </div>
        ))}
      </div>
    );
  }

  function handleEditButtonClick(event) {
    window.location.href = `${props.permitInfo.office_code}/edit`
  }

  function handleAddRSOButtonClick(event) {
    window.location.href = '/RSO/new'
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this permit?')
    if (confirmed) {
      const response = await fetch(`http://127.0.0.1:8000/api/${props.permitInfo.office_code}/edit`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(result)
    window.location.href = '/'
    }
  }

  return (
    <div>
    {props.permitInfo && 
    <div>
      <h2>RAM Information for {props.permitInfo.city}, {props.permitInfo.state_abbrev} </h2>
      <Button onClick={handleEditButtonClick}>Edit RAM info</Button> <Button onClick={handleDelete}>Delete this RAM Permit</Button> <br />
      <br />
      <p>
        Docket Number: {props.permitInfo.docket_num} <br />
        Expiration Date: {props.permitInfo.exp_date} <br />
        <p>Inspection Priority: {props.permitInfo.inspection_priority.priority_num}</p>
        </p>
      <p>Program Codes:</p>
      <ul>{createProgramCodeList()}</ul>
      <h3>Materials:</h3>
      <Table bordered hover>
        <thead>
          {props.permitInfo.material.map((use) => (
            <tr key={use.id}>
              <td key={use.source.id}>{use.source}</td>
              <td key={use.form.id}>{use.form}</td>
              <td key={use.amount_of_source.id}>{use.amount_of_source}</td>
            </tr>
        ))}
        </thead>
      </Table>
      {createAuthorizedUsesList()}
      {createAuthorizedUsersList()}
    </div>
    }
    </div>
  )
}

export default FacilityRAM