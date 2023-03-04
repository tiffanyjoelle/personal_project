import AddRSOForm from "../components/AddRSO"
import EditRSOForm from "../components/EditRSO"
import React, { useState, useEffect } from 'react';
import { Row, Col, Accordion } from "react-bootstrap"
import RSONotes from "../components/RSONotes";
import { useParams } from "react-router-dom";

function RSO() {

  let { office_code } = useParams()

  const [rsoInfo, setRSOInfo] = useState()
  const [permitInfo, setPermitInfo] = useState()
  
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
  
  useEffect( () => {
      async function getRSOInfo() {
        if (permitInfo){
        const base_url = process.env.REACT_APP_BASE_URL
        const response = await fetch(`http://127.0.0.1:8000/api/RSO/${permitInfo.primary_rso.id}`)
        const body = await response.json()
        setRSOInfo(body.result)
      }
    }
    getRSOInfo()
  }, [permitInfo])

  return (
    <div>
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit RSO Contact Information</Accordion.Header>
        <Accordion.Body>
        <EditRSOForm rso={rsoInfo} />
        <hr />
        <RSONotes rso={rsoInfo} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Add New RSO</Accordion.Header>
        <Accordion.Body><AddRSOForm permitID={office_code}/></Accordion.Body>
        </Accordion.Item>
    </Accordion>
    </div>
  )
}

export default RSO