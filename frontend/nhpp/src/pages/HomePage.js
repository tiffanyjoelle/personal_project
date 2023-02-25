import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

function HomePage() {

  const [user, setUser] = useState()

  useEffect( () => {
    async function getUserDetails() {
      const token = localStorage.getItem('token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      };
      try {
        const response = await fetch('http://127.0.0.1:8000/accounts/details', requestOptions);
        if (!response.ok) {
          throw new Error('Failed to retrieve user details');
        }
        const data = await response.json();
        setUser(data)
      } catch (error) {
        console.error(error);
      }
    }
    getUserDetails()
  }, [])

  console.log(user)
  return (
    <div>
      <Container>
        <Row>
          <h1>NHPP's Web-Based Licensing</h1>
        </Row>
        <Row>
          <Col><Link to="/RSO/598"> Radiation Safety Officer</Link></Col>
          <Col><Link to="PM">NHPP Program Manager</Link></Col>
        </Row>
      </Container>
    </div>
  )
}

export default HomePage