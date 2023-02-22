import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function FacilityRAM(props) {

  //move this to the dropdown menu component and pass info down as props, make external api call under demo component
  const [facilityInfo, setFacilityInfo] = useState()

  useEffect( () => {
    async function getFacilityInfo() {
      if (props.facilityID){
        const base_url = process.env.REACT_APP_BASE_URL
        const res = await fetch(`http://127.0.0.1:8000/api/${props.facilityID}`)
      const body = await res.json()
      setFacilityInfo(body.result)
      }
    }
    getFacilityInfo()
  }, [props.facilityID])
  
  function createAuthorizedUsesList() {
    return (
      <div>
        <h2>Authorized Uses:</h2>
        {facilityInfo.permit.authorized_use.map((use) => (
          <div key={use.id}>
            <h3>{use.material[0].material}</h3>
            <p>Form: {use.form[0].form}</p>
            <p>Amount of Material: {use.amount_of_material}</p>
            <p>Regulation Part: {use.use[0].regulation_part}</p>
            <p>Description: {use.use[0].description}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
    {facilityInfo && 
    <div>
      <h1>RAM Info for Facility {props.facilityID} </h1>
      {createAuthorizedUsesList()}
      <h2> Authorized Users</h2>
      <ul>
        <li>Name 1</li>
        <li>Name 2</li>
        <li>Name 3</li>
        <li>Name 4</li>
      </ul>
      <p>Options Available to only PMs: </p>
      <ul>
        <li><Link to="/edit_rso">Edit RSO</Link></li>
        <li>Edit RAM info</li>
        <li>Generate new permit</li>
      </ul>
    </div>
    }
    </div>
  )
}

export default FacilityRAM