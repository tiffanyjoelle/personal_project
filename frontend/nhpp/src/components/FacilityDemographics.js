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
      <h2>{props.permitInfo.city}, {props.permitInfo.state_abbrev} | Facility #{props.permitInfo.office_code}</h2>
      <p>
        Location Name: Placeholder for VA API call <br />
        Phone: Placeholder for VA API call <br />
        Address: Placeholder for VA API call <br />
      </p>
      <h3>Permit#: {props.permitInfo.permit_num}</h3>
      <p>
        Docket Number: {props.permitInfo.docket_num} <br />
        Expiration Date: {props.permitInfo.exp_date}
        </p>
      <h3>Radiation Safety Officer:</h3>
      <p>
        {props.permitInfo.primary_rso.first_name} {props.permitInfo.primary_rso.middle_name} {props.permitInfo.primary_rso.last_name}, {props.permitInfo.primary_rso.credentials} <br />
        Phone: {props.permitInfo.primary_rso.phone}
        <br />
        Alt Phone: {props.permitInfo.primary_rso.alt_phone}
        <br />
        Email: {props.permitInfo.primary_rso.email}
        <br />
        Consulting Firm: {props.permitInfo.primary_rso.consulting_firm}
        <br />
        <Link to={`/RSO/${props.permitInfo.primary_rso.id}`}>Edit contact information</Link>
        </p>
        
      {createProgramsList()}
      <hr />
      <p>Options Available to both PM and RSO: <br />
      <Link to={`/permit/${props.permitInfo.id}`}>View current RAM permit</Link>
      </p>
      <hr />
      </div>
      }
    </div>
  )
}

export default FacilityDemographics