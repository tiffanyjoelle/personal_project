import React from "react";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';


function FacilityDropdownMenu(props) {

  const [value, setValue] = useState('');

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