import FacilityDemographics from "./FacilityDemographics"
import React from "react";
import { useState, useEffect } from "react";
import { Container, Accordion, Tabs, Tab } from "react-bootstrap";
import NavBar from "./NavBar";
import EditRSOForm from "./RSO/EditRSO";
import PermitDocComponent from "./PermitDoc/PermitDocComponent";

function RSODashboard(props) {

  const token = 'Token ' + localStorage.getItem('token')

  const [permitInfo, setPermitInfo] = useState()
  const [facilityInfo, setFacilityInfo] = useState()

  useEffect( () => {
    async function getFacilityInfo() {
      if (props){
        const base_url = process.env.REACT_APP_BASE_URL
        const response = await fetch(`http://${base_url}/api/facility/${props.office_code}`, {
          headers: {
            'Authorization': token
          }
        })
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
      const res = await fetch(`http://${base_url}/api/${props.office_code}`, {
        headers: {
          'Authorization': token
        }
      })
      const body = await res.json()
      setPermitInfo(body.result)
      // }
    }
    getPermitInfo()
  }, [])

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

  return (
    <div>
      <NavBar />
      {(permitInfo && facilityInfo) ?
      <Container>
      <h1>Radiation Safety Officer Dashboard</h1>
      <hr />
      <a href="mailto:vhconhpp@va.gov">Contact NHPP</a>
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
      <Tab eventKey="rso" title="Edit RSO Contact Information">
      <EditRSOForm rso={permitInfo.primary_rso} />
      </Tab>
      <Tab eventKey="permit" title="View Permit">
      <PermitDocComponent facilityInfo={facilityInfo} permitInfo={permitInfo}/>
      </Tab>
      </Tabs>
      </Container>
      :
      <div>Loading...</div>
      }
    </div>
  )
}

export default RSODashboard