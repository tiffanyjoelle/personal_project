import React, { useState, useEffect } from 'react';
import { Accordion, Container } from "react-bootstrap"
import { useParams } from "react-router-dom";
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
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit Permit Details</Accordion.Header>
        <Accordion.Body>
        <EditPermitDetailsForm editPermitInfo={editPermitInfo}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <br />
      <p>
        Docket Number: {permitInfo.docket_num} <br /><br />
        Expiration Date: {permitInfo.exp_date} <br /><br />
        Inspection Priority: {permitInfo.inspection_priority.priority_num}
      </p>
        Program Codes:
        <ul>{createProgramCodeList()}</ul>
    </div>
  )
}

export default PermitDetails