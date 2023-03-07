import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import FacilityDropdownMenu from "./FacilityDropdownMenu"

function NavBar() {

  function handleLogoutBtnClick(event) {
    localStorage.setItem('token', '');
    window.location.href = "/"
  }

  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">RAM Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Add New" id="basic-nav-dropdown">
              <NavDropdown.Item href="/use/new">Authorized Use</NavDropdown.Item>
              <NavDropdown.Item href="/AU/new">Authorized User (AU)</NavDropdown.Item>
              <NavDropdown.Item href="/material/new">Material/Source</NavDropdown.Item>
              <NavDropdown.Item href="/permit/new">Permit</NavDropdown.Item>
              <NavDropdown.Item href="/permit_program/new">Program</NavDropdown.Item>
              <NavDropdown.Item href="/RSO/new">Radiation Safety Officer</NavDropdown.Item>
            </NavDropdown>
            <FacilityDropdownMenu />
            <Nav.Link onClick={handleLogoutBtnClick}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default NavBar