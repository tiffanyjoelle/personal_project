import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Tab, Tabs, Button } from 'react-bootstrap';
import FacilityDemographics from "../components/FacilityDemographics";
import FacilityRAM from "../components/FacilityRAM";
import PMNavBar from "../components/PMNavBar";
import PermitDoc from "../components/PermitDoc";
import RSO from "./RSO";
import MaterialsList from "../components/MaterialsList";
import AuthorizedUsesList from "../components/AuthorizedUsesList";
import AUList from "../components/AUList";

function PermitView() {

  let { office_code }  = useParams()
  const [permitInfo, setPermitInfo] = useState()
  const [facilityInfo, setFacilityInfo] = useState()

  // keep track of active tab for reload purposes so we don't get thrown out of current tab
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "demographics"
  );
  
  useEffect(() => {
    const savedActiveTab = localStorage.getItem("activeTab");
    if (savedActiveTab !== activeTab) {
      setActiveTab(savedActiveTab || "demographics");
    }
  }, [activeTab]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    localStorage.setItem("activeTab", tabKey);
  };

  function handleEditButtonClick(event) {
    window.location.href = `${office_code}/edit`
  }

  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this permit?')
    if (confirmed) {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/${office_code}/edit`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(result)
    window.location.href = '/'
    }
  }

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
          <Button onClick={handleEditButtonClick}>Edit RAM info</Button> <Button onClick={handleDelete}>Delete this RAM Permit</Button>
        </Row>
        <hr />
        <Tabs
      defaultActiveKey="demographics"
      activeKey={activeTab}
      onSelect={handleTabChange}
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="demographics" title="Demographics">
        <FacilityDemographics permitInfo={permitInfo} facilityInfo={facilityInfo}/>
      </Tab>
      <Tab eventKey="rso" title="Radiation Safety Officer">
        <RSO rso={permitInfo.primary_rso} permitID={permitInfo.office_code}/>
      </Tab>
      <Tab eventKey="info" title="Permit Details">
      <FacilityRAM permitInfo={permitInfo}/>
      </Tab>
      <Tab eventKey="materials" title="Materials">
      <MaterialsList permitInfo={permitInfo}/>
      </Tab>
      <Tab eventKey="authorized_uses" title="Authorized Uses">
      <AuthorizedUsesList permitInfo={permitInfo}/>
      </Tab>
      <Tab eventKey="authorized_users" title="Authorized Users (AUs)">
      <AUList permitInfo={permitInfo}/>
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