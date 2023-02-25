import FacilityDropdownMenu from "../components/FacilityDropdownMenu"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

function PMDashboard() {

  const [facilities, setFacilities] = useState('')

  useEffect( () => {
    async function getFacilities() {
      // const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch('http://127.0.0.1:8000/api/')
      const body = await res.json()
      // console.log(body.result)
      setFacilities(body.result)
    }
    getFacilities()
  }, [])

  function handleNewButtonClick(event) {
    window.location.href = "PM/permit/new"
  }

  return (
    <div>
      <Container>
        <Row>
          <h1>NHPP PM Dashboard</h1>
          <h2>NRC Articles</h2>
          <p>Pull some articles from NRC's ADAMS API</p>
          <hr />
          <Col><Button onClick={handleNewButtonClick}>Create New RAM Permit</Button></Col>
        </Row>
      <Row><FacilityDropdownMenu facilities={facilities}/></Row>
      </Container>
    </div>
  )
}

export default PMDashboard

// use class names to target each section w css to style page layout