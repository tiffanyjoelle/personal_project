import { Row, Nav, Button, Container } from "react-bootstrap";

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
          <Nav>
            <Button onClick={handleHomeBtnClick}>Home</Button>
            <Button onClick={handleLogoutBtnClick}>Logout</Button>
          </Nav>
    </div>
  )
}

export default NavBar


