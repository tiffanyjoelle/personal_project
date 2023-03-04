import AddRSOForm from "./AddRSO"
import EditRSOForm from "./EditRSO"
import React, { useState, useEffect } from 'react';
import { Accordion } from "react-bootstrap"
import RSONotes from "./RSONotes";
import { useParams } from "react-router-dom";
import ReplaceRsoForm from "./ReplaceRSO";

function RSO(props) {

  let { office_code } = useParams()

  return (
    <div>
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit {props.rso.first_name} {props.rso.last_name}'s Information</Accordion.Header>
        <Accordion.Body>
        <EditRSOForm rso={props.rso} />
        <hr />
        <RSONotes rso={props.rso} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Change RSO on Permit</Accordion.Header>
        <Accordion.Body>
        <ReplaceRsoForm editPermitInfo={props.editPermitInfo} rso={props.rso} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Add New RSO and Assign to Permit</Accordion.Header>
        <Accordion.Body><AddRSOForm permitID={office_code}/></Accordion.Body>
        </Accordion.Item>
    </Accordion>
    </div>
  )
}

export default RSO