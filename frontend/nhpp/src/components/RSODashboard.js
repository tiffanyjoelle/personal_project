import FacilityDemographics from "./FacilityDemographics"
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

function RSODashboard(props) {

  const [permitInfo, setPermitInfo] = useState()
  const [facilityInfo, setFacilityInfo] = useState()

  // useEffect( () => {
  //   async function getFacilityInfo() {
  //     if (office_code){
  //       const base_url = process.env.REACT_APP_BASE_URL
  //       const response = await fetch(`http://${base_url}/api/facility/${office_code}`)
  //     const body = await res.json()
  //     setFacilityInfo(body.data)
  //     // console.log(body)
  //     }
  //   }
  //   getFacilityInfo()
  // }, [office_code])

  console.log(props)
  useEffect( () => {
    async function getPermitInfo() {
      // if (office_code){
        const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`http://${base_url}/api/${props.office_code}`)
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
      </Container>
    </div>
  )
}

export default RSODashboard