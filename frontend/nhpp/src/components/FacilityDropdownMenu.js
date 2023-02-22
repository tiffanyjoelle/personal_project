import React from "react";
import { useState, useEffect } from "react";
import FacilityDemographics from "./FacilityDemographics";
import FacilityRAM from "./FacilityRAM";

function FacilityDropdownMenu(props) {

  const [value, setValue] = useState('');
  const [permitInfo, setPermitInfo] = useState()

  useEffect( () => {
    async function getPermitInfo() {
      if (value){
        // const base_url = process.env.REACT_APP_BASE_URL
        const res = await fetch(`http://127.0.0.1:8000/api/${value}`)
      const body = await res.json()
      setPermitInfo(body.result)
      }
    }
    getPermitInfo()
  }, [value])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  // console.log(props.facilities)
  
  return (
    <div>
    {props.facilities &&
    <div>
    <label>
      Facility Location
      <select value={value} onChange={handleChange}>
        <option></option>
          {props.facilities.map((item) => {
            return (
              <option key={item['id']} value={item['office_code']}>{item['city']}</option>
            );
          })}
        </select>
    </label>
    </div>
  }
    <FacilityDemographics permitInfo={permitInfo}/>
    <FacilityRAM permitInfo={permitInfo}/>
    </div>
  );
}

export default FacilityDropdownMenu;