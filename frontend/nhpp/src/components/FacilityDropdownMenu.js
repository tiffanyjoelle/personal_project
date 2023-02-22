import React from "react";
import { facilities } from "../data"; // fetch from db when combining django
import { useState, useEffect } from "react";
import FacilityDemographics from "./FacilityDemographics";
import FacilityRAM from "./FacilityRAM";

function FacilityDropdownMenu() {

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  
  return (
    <div>
    <label>
      Facility Location
      <select value={value} onChange={handleChange}>
          {facilities.map((item) => {
            return (
              <option key={item['facility-id']} value={item['facility-id']}>{item['facility-location']}</option>
            );
          })}
        </select>
    </label>
    <FacilityDemographics facilityID={value}/> this is where i make the api call and render data
    <FacilityRAM facilityID={value}/>
    </div>
  );
}

export default FacilityDropdownMenu;