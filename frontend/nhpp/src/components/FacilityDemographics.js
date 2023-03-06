import { Row,Col } from "react-bootstrap";

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
      <Row>
        <h2>Permit#: {props.permitInfo.permit_num}</h2>
        <hr />
      <Col>
      {props.facilityInfo &&
      <div className="card" style={{marginBottom: "30px"}}>
      <div className="card-header">{props.facilityInfo.attributes.name}</div>
      <div className="card-body">
        <p className="card-text">
          Phone: {props.facilityInfo.attributes.phone.main}
        </p>
        <p className="card-text">
          Address:
          <br />
          {props.facilityInfo.attributes.address.physical.address_1}
          <br />
          {props.facilityInfo.attributes.address.physical.city}, {props.facilityInfo.attributes.address.physical.state} {props.facilityInfo.attributes.address.physical.zip}
        </p>
      </div>
    </div>
      }
      
      <h3>Radiation Safety Officer:</h3>
      <div className="card" style={{marginBottom: "30px"}}>
      <div className="card-header">{props.permitInfo.primary_rso.first_name} {props.permitInfo.primary_rso.middle_name} {props.permitInfo.primary_rso.last_name}{props.permitInfo.primary_rso.credentials && <>, {props.permitInfo.primary_rso.credentials}</>}</div>
      <div className="card-body">
        <p className="card-text">
          Phone: {props.permitInfo.primary_rso.phone}
        </p>
        <p className="card-text">
          Alt Phone: {props.permitInfo.primary_rso.alt_phone}
        </p>
        <p className="card-text">
          Email: {props.permitInfo.primary_rso.email}
        </p>
        <p className="card-text">
          Consulting Firm: {props.permitInfo.primary_rso.consulting_firm}
        </p>
      </div>
    </div>
    </Col>
    <Col>
      {createProgramsList()}
      </Col>
      </Row>
      }
    </div>
  )
}

export default FacilityDemographics