import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap";

function HomePage() {

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