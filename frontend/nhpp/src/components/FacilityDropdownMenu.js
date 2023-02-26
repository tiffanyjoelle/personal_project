import React from "react";
import { useState, useEffect } from "react";
import FacilityDemographics from "./FacilityDemographics";
import FacilityRAM from "./FacilityRAM";
import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";

function FacilityDropdownMenu(props) {

  const [value, setValue] = useState('');
  // const [permitInfo, setPermitInfo] = useState()



  // add another useEffect to take props.selectedFacility if passed in as another prop and that will set value to that facility's office_code

  // useEffect( () => {
  //   async function getPermitInfo() {
  //     if (value){
  //       // const base_url = process.env.REACT_APP_BASE_URL
  //       const res = await fetch(`http://127.0.0.1:8000/api/${value}`)
  //     const body = await res.json()
  //     setPermitInfo(body.result)
  //     }
  //   }
  //   getPermitInfo()
  // }, [value])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  function handleNewButtonClick(event) {
    window.location.href = "permit/new"
  }

  const handleViewBtnClick = (e) => {
    if (value) {
      window.location.href = `/permit/${value}`
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div>
    <Row><Col><Button onClick={handleNewButtonClick}>Create New RAM Permit</Button></Col></Row><br />
    {props.facilities &&
    <div>
    <Row>
    <label>
      Facility Location
      <Form.Select value={value} onChange={handleChange}>
        <option></option>
          {props.facilities.map((item) => {
            return (
              <option key={item['id']} value={item['office_code']}>{item['city']}, {item['state_abbrev']}</option>
            );
          })}
        </Form.Select>
    </label>
    <Col><Button onClick={handleViewBtnClick}>View RAM Permit</Button></Col>
    </Row>
    </div>
  }
    <br />
  <hr />
  </div>
  );
}

export default FacilityDropdownMenu;