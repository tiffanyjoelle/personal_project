import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FacilityRAM(props) {

    const { office_code } = useParams()

    //state to toggle edit mode
    const [editMode, setEditMode] = useState(false);

    //used to hold edits to send to backend
    const [permitData, setPermitData] = useState({
      docket_num: "",
      exp_date: "",
      program_codes: [],
      inspection_priority: "",
    });

    //states to hold all current program codes available and state to hold codes that are selected in form
    const [programCodes, setProgramCodes] = useState([]);
    const [selectedProgramCodes, setSelectedProgramCodes] = useState([]);


    //state to hold all current inspection priorities available
    const [inspectionPriorities, setInspectionPriorities] = useState([]);

    //set initial values based on current permit info
    useEffect(() => {
      if (props.editPermitInfo) {
        setPermitData({
          docket_num: props.editPermitInfo.docket_num,
          exp_date: props.editPermitInfo.exp_date,
          inspection_priority: props.editPermitInfo.inspection_priority,
        });
        setSelectedProgramCodes(props.editPermitInfo.program_codes)
      }
    }, [props.editPermitInfo]);

    //function to grab current inspection priorities and assign to state
    useEffect(() => {
      async function fetchInspectionPriorities() {
        const base_url = process.env.REACT_APP_BASE_URL
        const response = await fetch(`http://127.0.0.1:8000/api/inspection_priorities`)
        const data = await response.json();
        setInspectionPriorities(data.result)
      }
      fetchInspectionPriorities();
    }, []);

    //function to grab all current program codes and fill in state
    useEffect(() => {
      async function fetchProgramCodes() {
        const base_url = process.env.REACT_APP_BASE_URL
        const response = await fetch(`http://127.0.0.1:8000/api/program_codes`)
        const data = await response.json();
        setProgramCodes(data.result)
      }
      fetchProgramCodes();
    }, []);

    //function to identify which codes are selected from form
    function handleProgramCodeSelect(event) {
      const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
      setSelectedProgramCodes(selectedValues)
    }

    //function to update data with inputs on form
    function handleChange (event) {
      const { name, value } = event.target
      setPermitData({ ...permitData, [name]: value })
    }
  
    //function to submit edited data to db
    async function handleSubmit(event) {
      event.preventDefault();
      //compile data to send
      const data = {
        docket_num: permitData.docket_num,
        exp_date: permitData.exp_date,
        inspection_priority: permitData.inspection_priority,
        program_codes: selectedProgramCodes,
      }
      const base_url = process.env.REACT_APP_BASE_URL
        const response = await fetch(`http://127.0.0.1:8000/api/${office_code}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      // console.log(result)
      window.location.reload()
    }

  //function to map out list of current permit program codes
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
    {props.permitInfo && (
      <>
        {editMode ? (
          <>
            <Form>
            <Form.Group>
        <Form.Label>Docket Number:</Form.Label>
        <Form.Control name='docket_num' placeholder='ex. 111-11111' value={permitData.docket_num} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Permit Expiration Date:</Form.Label>
        <Form.Control name='exp_date' placeholder='YYYY-MM-DD' value={permitData.exp_date} onChange={handleChange}></Form.Control>
      </Form.Group>
      <br />
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Inspection Priority:</Form.Label>
        <Form.Select id="inspection_priority" name='inspection_priority' onChange={handleChange}>{inspectionPriorities.map(priority => (
          <option key={priority.id} value={priority.id}>{priority.priority_num}</option>
        ))}
        </Form.Select>
      </Form.Group>
      <br />
      {selectedProgramCodes &&
      <Form.Group>
        <Form.Label><span style={{color: "red"}}>*</span> Program Code(s):</Form.Label>
        <Form.Select id="program_codes" name='program_codes' multiple value={selectedProgramCodes} onChange={handleProgramCodeSelect}>{programCodes.map(programCode => (
          <option key={programCode.id} value={programCode.id}>{programCode.code}</option>
        ))}
        </Form.Select>
      </Form.Group>
        }
      <br />
            </Form>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </>
        
        ) : (
          <>
            <p>
              Docket Number: {props.permitInfo.docket_num} <br />
              Expiration Date: {props.permitInfo.exp_date} <br />
              Inspection Priority:{" "}
              {props.permitInfo.inspection_priority.priority_num}
            </p>
            <p>Program Codes:</p>
            <ul>{createProgramCodeList()}</ul>
            <Button onClick={() => setEditMode(true)}>Edit</Button>
          </>
        )}
      </>
    )}
  </div>
  )
}

export default FacilityRAM