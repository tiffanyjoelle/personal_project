import { Table, Button, Col, Row } from 'react-bootstrap';

function AuthorizedUsesList(props) {

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

  return (
    <div>
    {props.permitInfo && 
    <>
      {createAuthorizedUsesList()}
      </>
    }
    </div>
  )
}

export default AuthorizedUsesList