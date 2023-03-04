import React from "react";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { NavDropdown } from 'react-bootstrap';


function FacilityDropdownMenu() {

  const [value, setValue] = useState('')
  const [facilities, setFacilities] = useState('')

  useEffect( () => {
    async function getFacilities() {
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch('http://127.0.0.1:8000/api/')
      const body = await res.json()
      // console.log(body.result)
      setFacilities(body.result)
    }
    getFacilities()
  }, [])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  return (

    <NavDropdown title="Facilities">
          {facilities ? (
            facilities.map((item) => {
              return (
                <NavDropdown.Item key={item['id']} href={`/permit/${item['office_code']}`} onClick={() => {
                  localStorage.setItem('activeTab', 'demographics');
                }}>
                  {item['city']}, {item['state_abbrev']}
                </NavDropdown.Item>
              );
            })
          ) : (
            <option disabled>Loading facilities...</option>
          )}
    </NavDropdown>
  )
}

export default FacilityDropdownMenu