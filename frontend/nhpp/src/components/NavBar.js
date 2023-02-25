import { Row, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom"

function NavBar() {

  function handleHomeBtnClick(event) {
    window.location.href = "/"
  }

  function handleLogoutBtnClick(event) {
    localStorage.setItem('token', '');
    window.location.href = "/"
  }

  return (
    <div>
        <Row>
          <Nav>
            <Button onClick={handleHomeBtnClick}>Home</Button>
            <Button onClick={handleLogoutBtnClick}>Logout</Button>
          </Nav>
        </Row>
    </div>
  )
}

export default NavBar


