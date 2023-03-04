import { Table, Button, Col, Row } from 'react-bootstrap';

function AUList(props) {

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

  return (
    <div>
    {props.permitInfo && 
    <div>
      {createAuthorizedUsersList()}
    </div>
    }
    </div>
  )
}

export default AUList