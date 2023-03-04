import FacilityDemographics from "./FacilityDemographics"
import React from "react";
import { useState, useEffect } from "react";
import { Container, Accordion } from "react-bootstrap";
import NavBar from "./NavBar";
import EditRSOForm from "./RSO/EditRSO";

function RSODashboard(props) {

  const [permitInfo, setPermitInfo] = useState()
  const [facilityInfo, setFacilityInfo] = useState()

  useEffect( () => {
    async function getFacilityInfo() {
      if (props.office_code){
        const base_url = process.env.REACT_APP_BASE_URL
        const response = await fetch(`http://127.0.0.1:8000/api/facility/${props.office_code}`)
      const body = await response.json()
      setFacilityInfo(body.data)
      // console.log(body)
      }
    }
    getFacilityInfo()
  }, [props])

  // console.log(props)
  useEffect( () => {
    async function getPermitInfo() {
      // if (office_code){
        const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`http://127.0.0.1:8000/api/${props.office_code}`)
      const body = await res.json()
      setPermitInfo(body.result)
      // }
    }
    getPermitInfo()
  }, [])

  return (
    <div>
      <NavBar />
      <Container>
      <h1>Radiation Safety Officer Dashboard</h1>
      <FacilityDemographics permitInfo={permitInfo} facilityInfo={facilityInfo}/>
      {permitInfo && <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit {permitInfo.primary_rso.first_name} {permitInfo.primary_rso.last_name}'s Information</Accordion.Header>
        <Accordion.Body>
        <EditRSOForm rso={permitInfo.primary_rso} />
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>}
      </Container>
    </div>
  )
}

export default RSODashboard