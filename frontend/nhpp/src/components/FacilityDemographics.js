// Put here what both pages will share (ie. facility demographics from VA API, RSO info, ability to download most recent permit)

import { Link } from 'react-router-dom'

// pass in param from url as props for this component

function FacilityDemographics(props) {

  function createProgramsList() {
    return (
      <div>
        <h3>Programs:</h3>
        {props.permitInfo.permit_program.map((item) => (
          <div key={item.id}>
            <li>{item.title}</li>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div>
      {props.permitInfo &&
      <div>
      <h2>Permit Information for {props.permitInfo.city}, {props.permitInfo.state_abbrev} Facility #{props.permitInfo.office_code}</h2>
      <p>Location Name: {props.permitInfo.city}, {props.permitInfo.state_abbrev} </p>
      <p>Phone: </p>
      <p>
        Address: 
      </p>
      <h3>{props.permitInfo.permit_num}</h3>
      <p>Docket Number: {props.permitInfo.docket_num}</p>
      <p>Expiration Date: {props.permitInfo.exp_date}</p>
      <p>RSO Information: </p>
        <blockquote>{props.permitInfo.primary_rso.first_name} {props.permitInfo.primary_rso.last_name} <br />
        {props.permitInfo.primary_rso.phone}
        <br />
        {props.permitInfo.primary_rso.email}
        </blockquote>
      {createProgramsList()}
      <hr />
      <p>Options Available to both PM and RSO: </p>
      <ul>
        <li><Link to={`/RSO/${props.permitInfo.primary_rso.id}`}>Edit RSO</Link></li> 
        <li><Link to={`/permit/${props.permitInfo.id}`}>View current RAM permit</Link></li>
      </ul>
      <hr />
      </div>
      }
    </div>
  )
}

export default FacilityDemographics