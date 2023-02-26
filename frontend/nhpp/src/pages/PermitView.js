import FacilityDropdownMenu from "../components/FacilityDropdownMenu"
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import FacilityDemographics from "../components/FacilityDemographics";
import FacilityRAM from "../components/FacilityRAM";
import NavBar from "../components/NavBar";

function PermitView() {

  let { office_code }  = useParams()
  const [permitInfo, setPermitInfo] = useState()

  useEffect( () => {
    async function getPermitInfo() {
      if (office_code){
        // const base_url = process.env.REACT_APP_BASE_URL
        const res = await fetch(`http://127.0.0.1:8000/api/${office_code}`)
      const body = await res.json()
      setPermitInfo(body.result)
      }
    }
    getPermitInfo()
  }, [office_code])

  return (
    <div>
      <NavBar />
        <Row>
          <h1>Facility #{office_code} </h1>
          <hr />
        </Row>
        <Row>
          <Col><FacilityDemographics permitInfo={permitInfo}/></Col>
          <Col><FacilityRAM permitInfo={permitInfo}/></Col>
        </Row>
    </div>
  )
}

export default PermitView