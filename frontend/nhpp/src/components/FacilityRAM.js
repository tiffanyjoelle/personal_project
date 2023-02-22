import { Link } from 'react-router-dom'

function FacilityRAM(props) {
  
  function createAuthorizedUsesList() {
    return (
      <div>
        <h2>Materials:</h2>
        {props.permitInfo.material.map((use) => (
          <div key={use.id}>
            <h3>{use.source.source}</h3>
            <p>Form: {use.form.form} | Amount of Material: {use.amount_of_source} | Description: {use.authorized_use.description}</p>
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
      <h1>RAM Information for {props.permitInfo.city}, {props.permitInfo.state_abbrev} </h1>
      Program Codes:
      <ul>{createProgramCodeList()}</ul>
      Inspection Priority: {props.permitInfo.inspection_priority.priority_num}
      {createAuthorizedUsesList()}
      {createAuthorizedUsersList()}
      <hr />
      <p>Options Available to only PMs: </p>
      <ul>
        <li>Edit RAM info</li>
        <li>Generate new permit</li>
      </ul>
    </div>
    }
    </div>
  )
}

export default FacilityRAM