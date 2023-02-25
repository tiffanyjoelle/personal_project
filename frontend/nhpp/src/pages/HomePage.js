import { Container, Row, Col, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import PMDashboard from "../components/PMDashboard"
import NavBar from "../components/NavBar";

function HomePage() {

  const [user, setUser] = useState()

  useEffect( () => {
    const token = localStorage.getItem('token');
    if (token) {
      // fetch user details using the token
      fetch('http://127.0.0.1:8000/accounts/details', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    } else {
      // redirect user to login page if not authenticated
      window.location.href = '/login';
    }
  }, []);

  // console.log(user)

  return (
    <div>
      {user &&
      <Container>
        <NavBar />
        <Row>
          <Col><PMDashboard /></Col>
        </Row>
      </Container>
      }
    </div>
  )
}

export default HomePage