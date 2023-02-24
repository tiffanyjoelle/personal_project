import React, { useState, useEffect } from "react";

function PermitForm() {
  const [programCodes, setProgramCodes] = useState([]);
  const [selectedProgramCodes, setSelectedProgramCodes] = useState([]);
  const [rso, setRSO] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [inspectionPriorities, setInspectionPriorities] = useState([]);
  const [authorizedUse, setAuthorizedUses] = useState([]);
  const [selectedAuthorizedUses, setSelectedAuthorizedUses] = useState([]);
  const [authorizedUser, setAuthorizedUsers] = useState([]);
  const [selectedAuthorizedUsers, setSelectedAuthorizedUsers] = useState([]);
  const [permitPrograms, setPermitPrograms] = useState([]);
  const [selectedPermitPrograms, setSelectedPermitPrograms] = useState([]);
  
  useEffect(() => {
    async function fetchInspectionPriorities() {
      const response = await fetch('http://127.0.0.1:8000/api/inspection_priorities')
      const data = await response.json();
      setInspectionPriorities(data.result)
      // console.log(data.result)
    }
    fetchInspectionPriorities();
  }, []);

  useEffect(() => {
    async function fetchRSOs() {
      const response = await fetch('http://127.0.0.1:8000/api/RSO')
      const data = await response.json();
      setRSO(data.result)
      // console.log(data.result)
    }
    fetchRSOs();
  }, []);

  useEffect(() => {
    async function fetchProgramCodes() {
      const response = await fetch('http://127.0.0.1:8000/api/program_codes')
      const data = await response.json();
      setProgramCodes(data.result)
      // console.log(data.result)
    }
    fetchProgramCodes();
  }, []);
  
  function handleProgramCodeSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedProgramCodes(selectedValues)
  }

  useEffect(() => {
    async function fetchMaterials() {
      const response = await fetch('http://127.0.0.1:8000/api/materials')
      const data = await response.json();
      setMaterials(data.result)
      // console.log(data.result)
    }
    fetchMaterials();
  }, []);
  
  function handleMaterialSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedMaterials(selectedValues)
  }

  useEffect(() => {
    async function fetchAuthorizedUses() {
      const response = await fetch('http://127.0.0.1:8000/api/authorized_uses')
      const data = await response.json();
      setAuthorizedUses(data.result)
      // console.log(data.result)
    }
    fetchAuthorizedUses();
  }, []);
  
  function handleAuthorizedUseSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthorizedUses(selectedValues)
  }

  useEffect(() => {
    async function fetchAuthorizedUsers() {
      const response = await fetch('http://127.0.0.1:8000/api/authorized_users')
      const data = await response.json();
      setAuthorizedUsers(data.result)
      // console.log(data.result)
    }
    fetchAuthorizedUsers();
  }, []);
  
  function handleAuthorizedUserSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedAuthorizedUsers(selectedValues)
  }

  useEffect(() => {
    async function fetchPermitPrograms() {
      const response = await fetch('http://127.0.0.1:8000/api/permit_programs')
      const data = await response.json();
      setPermitPrograms(data.result)
      // console.log(data.result)
    }
    fetchPermitPrograms();
  }, []);
  
  function handlePermitProgramSelect(event) {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedPermitPrograms(selectedValues)
  }

  const [permitData, setPermitData] = useState({
    city: "",
    state_abbrev: "",
    office_code: "",
    permit_num: "",
    docket_num: "",
    exp_date: "",
    program_codes: [],
    inspection_priority: "",
    primary_rso: "",
    material: [],
    authorized_use: [],
    authorized_user: [],
    permit_program: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setPermitData({ ...permitData, [name]: value })
  }
  
  // const handleMultipleOptionChange = (event) => {
  //   const { name, value } = event.target
  //   const valueArr = value ? value.split(',').map((v) => v.trim()) : null
  //   setPermitData({ ...permitData, [name]: valueArr })
  // }
  // console.log(permitData.program_codes)
  // console.log(selectedProgramCodes)

  async function handleSubmit(event) {
    event.preventDefault();
    //compile data to send
    const data = {
      city: permitData.city,
      state_abbrev: permitData.state_abbrev,
      office_code: permitData.office_code,
      permit_num: permitData.permit_num,
      docket_num: permitData.docket_num,
      exp_date: permitData.exp_date,
      program_codes: selectedProgramCodes,
      inspection_priority: permitData.inspection_priority,
      primary_rso: permitData.primary_rso,
      material: selectedMaterials,
      authorized_use: selectedAuthorizedUses,
      authorized_user: selectedAuthorizedUsers,
      permit_program: selectedPermitPrograms,
    }
    const response = await fetch('http://127.0.0.1:8000/api/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    // add in handle success or error
    // console.log(JSON.stringify(data))
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>New RAM Permit</h1>
      <label>
        Facility City:
        <input
          type="text"
          name="city"
          value={permitData.city}
          onChange={handleChange}
        />
        *required
      </label>
      <br />
      <br />
      <label>
        Facility State:
        <input
          type="text"
          name="state_abbrev"
          value={permitData.state_abbrev}
          onChange={handleChange}
        />
        *required
      </label>
      <br />
      <br />
      <label>
        Office Code:
        <input
          type="text"
          name="office_code"
          value={permitData.office_code}
          onChange={handleChange}
        />
        *required
      </label>
      <br />
      <br />
      <label>
        Permit Number:
        <input
          type="text"
          name="permit_num"
          value={permitData.permit_num}
          onChange={handleChange}
        />
        *required
      </label>
      <br />
      <br />
      <label>
        Docket Number:
        <input
          type="text"
          name="docket_num"
          value={permitData.docket_num}
          onChange={handleChange}
        />
      </label>
      <br />
      <br />
      <label>
        Expiration Date:
        <input
          type="text"
          name="exp_date"
          value={permitData.exp_date}
          onChange={handleChange}
        />
        <span>*required</span>
      </label>
      <br />
      <br />
      <label>Program Code(s): *required<br />
      <select id="program_codes" name="program_codes" multiple onChange={handleProgramCodeSelect}>
        {programCodes.map(programCode => (
          <option key={programCode.id} value={programCode.id}>{programCode.code}</option>
        ))}
      </select>
      </label>
      <br />
      <br />
      <label>
        Inspection Priority:
        <select id="inspection_priority" name="inspection_priority" onChange={handleChange}>
        {inspectionPriorities.map(priority => (
          <option key={priority.id} value={priority.id}>{priority.priority_num}</option>
        ))}
      </select>
      </label>
      <br />
      <br />
      <label>
        Radiation Safety Officer:
        <select id="primary_rso" name="primary_rso" onChange={handleChange}>
        {rso.map(rso => (
          <option key={rso.id} value={rso.id}>{rso.last_name}, {rso.first_name}</option>
        ))}
        </select>
      </label>
      <br />
      <br />
      <label>
        Material(s): <br />
        Source, Form, Amount<br />
        <select id="material" name="material" multiple onChange={handleMaterialSelect}>
        {materials.map(material => (
          <option key={material.id} value={material.id}>{material.source}, {material.form}, {material.amount_of_source} </option>
        ))}
      </select>
      </label>
      <br />
      <br />
      <label>
        Authorized Use(s):
        <select id="authorized_use" name="authorized_use" multiple onChange={handleAuthorizedUseSelect}>
        {authorizedUse.map(use => (
          <option key={use.id} value={use.id}>{use.use}</option>
        ))}
      </select>
      </label>
      <br />
      <br />
      <label>
        Authorized User(s):
        <select id="authorized_user" name="authorized_user" multiple onChange={handleAuthorizedUserSelect}>
        {authorizedUser.map(user => (
          <option key={user.id} value={user.id}>{user.full_name}, {user.credentials}</option>
        ))}
      </select>
      </label>
      <br />
      <br />
      <label>
        Programs:
        <select id="permit_program" name="permit_program" multiple onChange={handlePermitProgramSelect}>
        {permitPrograms.map(program => (
          <option key={program.id} value={program.id}>{program.title}</option>
        ))}
      </select>
      </label>
      <br />
      <br />
      <button type="submit">Create Permit</button>
    </form>
  );
}

export default PermitForm;