import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function NavBar() {

  function handleLogoutBtnClick(event) {
    localStorage.setItem('token', '');
    window.location.href = "/"
  }

  return (
    <div>
          <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">NHPP's Web Based Licensing</Navbar.Brand>
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

