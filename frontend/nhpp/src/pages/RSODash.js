import FacilityDemographics from "../components/FacilityDemographics"
import { useParams } from "react-router-dom"
import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function RSODash() {

  let office_code = useParams()
  const [permitInfo, setPermitInfo] = useState()
  
  useEffect( () => {
    async function getPermitInfo() {
      if (office_code){
        // const base_url = process.env.REACT_APP_BASE_URL
        const res = await fetch(`http://127.0.0.1:8000/api/${office_code.office_code}`)
      const body = await res.json()
      setPermitInfo(body.result)
      }
    }
    getPermitInfo()
  }, [office_code])

  return (
    <div>
      <Container>
      <h1>RSO Dashboard</h1>
      <p> RSOs can only see base FacilityDemographics component, which will allow for editing RSO contact info.</p>
      <p>Will need to pass facilityID parameter automatically from login, perhaps something I can pass w the django login permissions??</p>
      <FacilityDemographics permitInfo={permitInfo}/>
      </Container>
    </div>
  )
}

export default RSODash