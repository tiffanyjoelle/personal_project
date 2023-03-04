import AddAuthorizedUseForm from "./AddAuthorizedUse";
import { Accordion } from "react-bootstrap";
import EditAuthorizedUsesForm from "./EditAuthorizedUses";

function AuthorizedUsesList(props) {

  function createAuthorizedUsesList() {
    return (
      <div>
        <h4>Authorized Uses:</h4>
        <ol>
        {props.permitInfo.authorized_use.map((use) => (
          <div key={use.id}>
            <li>{use.use}</li>
          </div>
        ))}
        </ol>
      </div>
    );
  }

  return (
    <div>
    {props.permitInfo && 
    <>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit Permit Authorized Uses</Accordion.Header>
        <Accordion.Body>
        <EditAuthorizedUsesForm editPermitInfo={props.editPermitInfo} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add New Authorized Use to Selection List</Accordion.Header>
        <Accordion.Body>
        <AddAuthorizedUseForm />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <br />
      {createAuthorizedUsesList()}
      </>
    }
    </div>
  )
}

export default AuthorizedUsesList