import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Tab, Tabs } from 'react-bootstrap';
import FacilityDemographics from "../components/FacilityDemographics";
import FacilityRAM from "../components/FacilityRAM";
import PMNavBar from "../components/PMNavBar";
import PermitDoc from "../components/PermitDoc";
import RSO from "./RSO";

function PermitView() {

  let { office_code }  = useParams()
  const [permitInfo, setPermitInfo] = useState()
  const [facilityInfo, setFacilityInfo] = useState()

  // useEffect( () => {
  //   async function getFacilityInfo() {
  //     if (office_code){
  //       const base_url = process.env.REACT_APP_BASE_URL
  //     const res = await fetch(`http://127.0.0.1:8000/api/facility/${office_code}`)
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
        const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`http://127.0.0.1:8000/api/${office_code}`)
      const body = await res.json()
      setPermitInfo(body.result)
      }
    }
    getPermitInfo()
  }, [office_code])
  // console.log(facilityInfo)
  // console.log(permitInfo.primary_rso)
  return (
    <div>
      <PMNavBar />
      {permitInfo &&
      <Container>
        <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh', backgroundColor: '#4682B4', color: 'whitesmoke'}}>
          <h1 style={{ textAlign: 'center' }}>Facility #{office_code} {permitInfo && permitInfo.city}, {permitInfo && permitInfo.state_abbrev}</h1>
        </Row>
        <hr />
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="demographics" title="Demographics">
        <FacilityDemographics permitInfo={permitInfo} facilityInfo={facilityInfo}/>
      </Tab>
      <Tab eventKey="rso" title="Radiation Safety Officer">
        <RSO rso={permitInfo.primary_rso} permitID={permitInfo.office_code}/>
      </Tab>
      <Tab eventKey="codes" title="Program Codes & Inspection Priority">
      <FacilityRAM permitInfo={permitInfo}/>
      </Tab>
      <Tab eventKey="materials" title="Materials">
      <FacilityRAM permitInfo={permitInfo}/>
      </Tab>
      <Tab eventKey="authorized_uses" title="Authorized Uses">
      <FacilityRAM permitInfo={permitInfo}/>
      </Tab>
      <Tab eventKey="authorized_users" title="Authorized Users (AUs)">
      <FacilityRAM permitInfo={permitInfo}/>
      </Tab>
      <Tab eventKey="permit" title="View Permit">
      <PermitDoc facilityInfo={facilityInfo} permitInfo={permitInfo}/>
      </Tab>
      </Tabs>
      </Container>
      }
    </div>
  )
}

export default PermitView