import { Link } from 'react-router-dom'
import PermitDoc from "./PermitDoc";
import ReactDOM from 'react-dom';
import { Button } from "react-bootstrap";

function FacilityDemographics(props) {

  // function openPermitWindow(props) {
  //   const permitWindow = window.open('', 'permitWindow', 'width=600,height=400');
  //   permitWindow.document.write('<html><head><title>Permit Document</title></head><body>');
  //   permitWindow.document.write('<div>');
  //   permitWindow.document.write('<br /><br />');
  //   permitWindow.document.write('<div id="permitContainer"></div>');
  //   permitWindow.document.write('</div>');
  //   permitWindow.document.write('</body></html>');

  //   const permitContainer = permitWindow.document.getElementById('permitContainer');
  //   ReactDOM.render(<PermitDoc facilityInfo={props.facilityInfo} permitInfo={props.permitInfo}/>, permitContainer);

  // }

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
        <h2>Permit#: {props.permitInfo.permit_num}</h2>
      {/* <Button onClick={() => openPermitWindow({permitInfo: props.permitInfo, facilityInfo: props.facilityInfo})}>View Radioactive Materials Permit Document</Button><br /> <br /> */}
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
        <p className="card-text">
        <Link to={`/RSO/${props.permitInfo.primary_rso.id}`}>Edit contact information</Link>
        </p>
      </div>
    </div>
        
      {createProgramsList()}
      <br />
      </div>
      }
    </div>
  )
}

export default FacilityDemographics