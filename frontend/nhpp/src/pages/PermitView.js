import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import FacilityDemographics from "../components/FacilityDemographics";
import FacilityRAM from "../components/FacilityRAM";
import PMNavBar from "../components/PMNavBar";

function PermitView() {

  let { office_code }  = useParams()
  const [permitInfo, setPermitInfo] = useState()
  const [facilityInfo, setFacilityInfo] = useState()
  const [permitToggle, setPermitToggle] = useState(false);

  // useEffect( () => {
  //   async function getFacilityInfo() {
  //     if (office_code){
  //       // const base_url = process.env.REACT_APP_BASE_URL
  //       const res = await fetch(`http://127.0.0.1:8000/api/facility/${office_code}`)
  //     const body = await res.json()
  //     setFacilityInfo(body.data)
  //     // console.log(body)
  //     }
  //   }
  //   getFacilityInfo()
  // }, [office_code])

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
  // console.log(facilityInfo)

  return (
    <div>
      <PMNavBar />
      <Container>
        <Row>
          <h1>Facility #{office_code} </h1>
          <hr />
        </Row>
        <Row>
          <Col><FacilityDemographics permitInfo={permitInfo} facilityInfo={facilityInfo}/></Col>
          <Col><FacilityRAM permitInfo={permitInfo}/></Col>
        </Row>
        </Container>
    </div>
  )
}

export default PermitView