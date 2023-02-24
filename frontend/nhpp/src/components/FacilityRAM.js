import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap';

function FacilityRAM(props) {

  function createAuthorizedUsesList() {
    return (
      <div>
        <h2>Authorized Uses:</h2>
        {props.permitInfo.authorized_use.map((use) => (
          <div key={use.id}>
            <li>{use.use}</li>
          </div>
        ))}
      </div>
    );
  }

  function createAuthorizedUsersList() {
    return (
      <div>
        <h2>Authorized Users:</h2>
        {props.permitInfo.authorized_user.map((user) => (
          <div key={user.id}>
            <p>{user.full_name}, {user.credentials}</p>
          </div>
        ))}
      </div>
    );
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
    window.location.href = `PM/permit/${props.permitInfo.office_code}/edit`
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
    window.location.href = '/PM'
    }
  }

  return (
    <div>
    {props.permitInfo && 
    <div>
      <h2>RAM Information for {props.permitInfo.city}, {props.permitInfo.state_abbrev} </h2>
      <Button onClick={handleEditButtonClick}>Edit RAM info</Button> <Button onClick={handleDelete}>Delete this RAM Permit</Button> <br />
      <Link to="">Generate new permit</Link> <br /><br />
      <p>Program Codes:</p>
      <ul>{createProgramCodeList()}</ul>
      Inspection Priority: {props.permitInfo.inspection_priority.priority_num}
      <h2>Materials:</h2>
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
      <hr />
    </div>
    }
    </div>
  )
}

export default FacilityRAM