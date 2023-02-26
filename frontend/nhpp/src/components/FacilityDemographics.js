import { Link } from 'react-router-dom'

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
      {props.facilityInfo &&
      <p>
        Location Name: {props.facilityInfo.attributes.name} <br />
        Phone: {props.facilityInfo.attributes.phone.main} <br />
        Address: <br />
        {props.facilityInfo.attributes.address.physical.address_1} <br />
        {props.facilityInfo.attributes.address.physical.city}, {props.facilityInfo.attributes.address.physical.state} {props.facilityInfo.attributes.address.physical.zip} <br />
      </p>
      }
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
      {/* <Link to={`/permit/${props.permitInfo.id}`}>View current RAM permit</Link> */}
      </p>
      <hr />
      </div>
      }
    </div>
  )
}

export default FacilityDemographics