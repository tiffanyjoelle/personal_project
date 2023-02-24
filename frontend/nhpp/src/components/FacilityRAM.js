import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap';

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

  return (
    <div>
    {props.permitInfo && 
    <div>
      <h2>RAM Information for {props.permitInfo.city}, {props.permitInfo.state_abbrev} </h2>
      <p>Options Available to only PMs: </p>
      <Link to={{pathname:`permit/${props.permitInfo.office_code}/edit`, state:props.permitInfo}}>Edit RAM info</Link>
      <p>Generate new permit</p>
      <p>Program Codes:</p>
      <ul>{createProgramCodeList()}</ul>
      Inspection Priority: {props.permitInfo.inspection_priority.priority_num}
      <h2>Materials:</h2>
      <Table bordered hover>
        <thead>
          {props.permitInfo.material.map((use) => (
            <tr>
              <td>{use.source}</td>
              <td>{use.form}</td>
              <td>{use.amount_of_source}</td>
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