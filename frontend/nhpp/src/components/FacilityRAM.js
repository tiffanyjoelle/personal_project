import { Link } from 'react-router-dom'

function FacilityRAM(props) {

  function createMaterialsList() {
    return (
      <div>
        {props.permitInfo.material.map((use) => (
          <div key={use.id}>
            <h3>{use.source}</h3>
            <p>Form: {use.form} | Amount of Material: {use.amount_of_source}</p>
          </div>
        ))}
      </div>
    );
  }

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
      <h1>RAM Information for {props.permitInfo.city}, {props.permitInfo.state_abbrev} </h1>
      Program Codes:
      <ul>{createProgramCodeList()}</ul>
      Inspection Priority: {props.permitInfo.inspection_priority.priority_num}
      <h2>Materials:</h2>
      <blockquote>{createMaterialsList()}</blockquote>
      {createAuthorizedUsesList()}
      {createAuthorizedUsersList()}
      <hr />
      <p>Options Available to only PMs: </p>
      <Link to={{pathname:`permit/${props.permitInfo.office_code}/edit`, state:props.permitInfo}}>Edit RAM info</Link>
      <ul>
        <li>Generate new permit</li>
      </ul>
    </div>
    }
    </div>
  )
}

export default FacilityRAM