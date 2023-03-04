import React, { useState, useEffect } from 'react';
import { Accordion, Row, Col } from "react-bootstrap"
import EditPermitDetailsForm from './EditPermitDetails';

function PermitDetails(props) {

  const [permitInfo, setPermitInfo] = useState(props.permitInfo)
  const [editPermitInfo, setEditPermitInfo] = useState(props.editPermitInfo)
  
  // useEffect( () => {
  //   async function getPermitInfo() {
  //     if (office_code){
  //       const base_url = process.env.REACT_APP_BASE_URL
  //     const res = await fetch(`http://127.0.0.1:8000/api/${office_code}`)
  //     const body = await res.json()
  //     setPermitInfo(body.result)
  //     }
  //   }
  //   getPermitInfo()
  // }, [office_code])

    //function to map out list of current permit program codes
    function createProgramCodeList() {
      return (
        <div>
          <h4>Program Codes:</h4>
          {permitInfo.program_codes.map((item) => (
            <div key={item.id}>
              <li>{item.code}</li>
            </div>
          ))}
        </div>
      );
    }

    function createProgramsList() {
      return (
        <div>
          <h4>Notable Programs:</h4>
          {props.permitInfo.permit_program.map((item) => (
            <div key={item.id}>
              <li>{item.title}</li>
            </div>
          ))}
        </div>
      );
    }
  

  return (
    <div>
      {editPermitInfo &&
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit Permit Details</Accordion.Header>
        <Accordion.Body>
        <EditPermitDetailsForm editPermitInfo={editPermitInfo}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    }
    <br />
    <Row>
      <Col>
          <h4>Permit Number:</h4> {permitInfo.permit_num} <br /><br />
          <h4>Docket Number:</h4> {permitInfo.docket_num} <br /><br />
          <h4>Expiration Date:</h4> {permitInfo.exp_date} <br /><br />
        </Col>
        <Col>
          {createProgramCodeList()}<br />
          <h4>Inspection Priority:</h4> {permitInfo.inspection_priority.priority_num}
        </Col>
    </Row>
    </div>
  )
}

export default PermitDetails