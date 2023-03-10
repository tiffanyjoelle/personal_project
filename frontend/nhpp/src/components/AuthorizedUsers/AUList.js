import EditAUForm from "./EditAUList"
import AddAUForm from "./AddAU"
import { Accordion } from "react-bootstrap"

function AUList(props) {

  // create list of AUs from permit
  function createAuthorizedUsersList() {
    if (props.permitInfo.authorized_user.length > 0) {
      return (
        <div>
          <h4>Authorized Users:</h4>
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

  return (
    <div>
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit Permit Authorized Users</Accordion.Header>
        <Accordion.Body>
        <EditAUForm editPermitInfo={props.editPermitInfo} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Accordion>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Add New Authorized User to Selection List</Accordion.Header>
        <Accordion.Body>
        <AddAUForm />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <br />
      {createAuthorizedUsersList()}
    </div>
  )
}

export default AUList