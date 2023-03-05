import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Tab, Tabs, Button } from 'react-bootstrap';
import FacilityDemographics from "../components/FacilityDemographics";
import PMNavBar from "../components/PMNavBar";
import PermitDoc from "../components/PermitDoc";
import RSO from "../components/RSO/RSO";
import MaterialsList from "../components/Materials/MaterialsList";
import AuthorizedUsesList from "../components/AuthorizedUses/AuthorizedUses";
import AUList from "../components/AuthorizedUsers/AUList";
import PermitDetails from "../components/PermitDetails/PermitDetails";

function PermitView() {

  let { office_code }  = useParams()
  //used to hold current permit data from db
  const [permitInfo, setPermitInfo] = useState()
  const [editPermitInfo, setEditPermitInfo] = useState()
  //used to hold info pulled from VA Facilities API
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

  //button function to edit all information in permit at once
  function handleEditButtonClick(event) {
    window.location.href = `${office_code}/edit`
  }

  //button function to delete permit
  async function handleDelete(event) {
    event.preventDefault();
    const confirmed = window.confirm('Are you sure you want to delete this permit?')
    if (confirmed) {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/${office_code}/edit`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(result)
    window.location.href = '/'
    }
  }

  // 3rd party API call to get VA facility current name, address, phone number
  useEffect( () => {
    async function getFacilityInfo() {
      if (office_code){
        const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`http://${base_url}/api/facility/${office_code}`)
      const body = await res.json()
      setFacilityInfo(body.data)
      // console.log(body)
      }
    }
    getFacilityInfo()
  }, [office_code])

  //DRF API call to get current permit info
  useEffect( () => {
    async function getPermitInfo() {
      if (office_code){
        const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`http://${base_url}/api/${office_code}`)
      const body = await res.json()
      setPermitInfo(body.result)
      }
    }
    getPermitInfo()
  }, [office_code])

  useEffect( () => {
    async function getEditPermitInfo() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api/${office_code}/edit`)
      const body = await response.json()
      setEditPermitInfo(body.result)
    }
    getEditPermitInfo()
  }, [])


  return (
    <div>
      <PMNavBar />
      {(permitInfo && editPermitInfo) &&
      <Container>
        <Row className="text-center" style={{ display: 'flex', alignItems: 'center', height: '20vh', backgroundColor: '#4682B4', color: 'whitesmoke'}}>
          <h1 style={{ textAlign: 'center' }}>Facility #{office_code} {permitInfo && permitInfo.city}, {permitInfo && permitInfo.state_abbrev}</h1>
          <Col className="text-center"><Button variant="secondary" onClick={handleEditButtonClick}>Edit RAM info</Button> <Button variant="secondary" onClick={handleDelete}>Delete this RAM Permit</Button></Col>
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
        <RSO permitInfo={permitInfo} editPermitInfo={editPermitInfo} rso={permitInfo.primary_rso} />
      </Tab>
      <Tab eventKey="info" title="Permit Details">
      <PermitDetails permitInfo={permitInfo} editPermitInfo={editPermitInfo}/>
      </Tab>
      <Tab eventKey="materials" title="Materials">
      <MaterialsList permitInfo={permitInfo} editPermitInfo={editPermitInfo}/>
      </Tab>
      <Tab eventKey="authorized_uses" title="Authorized Uses">
      <AuthorizedUsesList permitInfo={permitInfo} editPermitInfo={editPermitInfo}/>
      </Tab>
      <Tab eventKey="authorized_users" title="Authorized Users (AUs)">
      <AUList permitInfo={permitInfo} editPermitInfo={editPermitInfo}/>
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