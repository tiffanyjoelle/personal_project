import { Navbar, Container, Nav } from "react-bootstrap";

function NavBar() {

  function handleLogoutBtnClick() {
    localStorage.setItem('token', '');
    window.location.href = "/login"
  }


  return (
    <div>
          <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">NHPP's Web Based Permitting</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link onClick={handleLogoutBtnClick}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar


