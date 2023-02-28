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
            <NavDropdown title="Add New" id="basic-nav-dropdown">
              <NavDropdown.Item href="/RSO/new">Radiation Safety Officer</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Authorized User</NavDropdown.Item>
              <NavDropdown.Item href="/permit/new">Permit</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={handleLogoutBtnClick}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar


