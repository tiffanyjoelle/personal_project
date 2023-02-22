import FacilityDropdownMenu from "../components/FacilityDropdownMenu"
import { useState, useEffect } from "react";

function PMDash() {

  const [facilities, setFacilities] = useState('')

  useEffect( () => {
    async function getFacilities() {
      // const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch('http://127.0.0.1:8000/api/')
      const body = await res.json()
      // console.log(body.result)
      setFacilities(body.result)
    }
    getFacilities()
  }, [])

  return (
    <div>
      <h1>NHPP PM Dashboard</h1>
      <p>PMs will have extra options underneath the base FacilityDemographics component.</p>
      <h2>NRC Articles</h2>
      <p>Pull some articles from NRC's ADAMS API</p>
      <hr />
      <FacilityDropdownMenu facilities={facilities}/>
    </div>
  )
}

export default PMDash

// use class names to target each section w css to style page layout