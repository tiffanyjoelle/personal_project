import React, { useState, useEffect } from 'react';
import { Accordion, Row, Col } from "react-bootstrap"
import EditPermitDetailsForm from './EditPermitDetails';

function PermitDetails(props) {

  const [permitInfo, setPermitInfo] = useState(props.permitInfo)
  const [editPermitInfo, setEditPermitInfo] = useState(props.editPermitInfo)
  
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