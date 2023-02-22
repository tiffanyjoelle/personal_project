// Put here what both pages will share (ie. facility demographics from VA API, RSO info, ability to download most recent permit)

import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

// pass in param from url as props for this component

function FacilityDemographics(props) {

  const [permitInfo, setPermitInfo] = useState()

  useEffect( () => {
    async function getPermitInfo() {
      if (props.facilityID){
        // const base_url = process.env.REACT_APP_BASE_URL
        const res = await fetch(`http://127.0.0.1:8000/api/${props.facilityID}`)
      const body = await res.json()
      console.log(props.facilityID)
      console.log(body.result)
      setPermitInfo(body.result)
      }
    }
    getPermitInfo()
  }, [props.facilityID])
  
  return (
    <div>
      <h1>Permit Information for Facility {props.facilityID} </h1>
      {permitInfo &&
      <div>
      <p>Location Name: {permitInfo.city}, {permitInfo.state_abbrev} </p>
      <p>Phone: </p>
      <p>
        Address: 
      </p>
      <p>RSO Information: {permitInfo.primary_rso.first_name} </p>
      <p>Options Available to both PM and RSO: </p>
      <ul>
        <li><Link to="/edit_rso">Edit RSO</Link></li>
        <li><Link to="/view_permit">View current RAM permit</Link></li>
      </ul>
      </div>
      }
    </div>
  )
}

export default FacilityDemographics