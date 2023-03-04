import { Table, Button, Col, Row } from 'react-bootstrap';

function FacilityRAM(props) {

  function createProgramCodeList() {
    return (
      <div>
        {props.permitInfo.program_codes.map((item) => (
          <div key={item.id}>
            <li>{item.code}</li>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
    {props.permitInfo && 
    <>
      <p>
        Docket Number: {props.permitInfo.docket_num} <br />
        Expiration Date: {props.permitInfo.exp_date} <br />
        Inspection Priority: {props.permitInfo.inspection_priority.priority_num}
        </p>
      <p>Program Codes:</p>
      <ul>{createProgramCodeList()}</ul>
    </>
    }
    </div>
  )
}

export default FacilityRAM