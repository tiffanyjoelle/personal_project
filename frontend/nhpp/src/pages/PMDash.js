import FacilityDropdownMenu from "../components/FacilityDropdownMenu"

function PMDash() {
  
  return (
    <div>
      <h1>NHPP PM Dashboard</h1>
      <p>PMs will have extra options underneath the base FacilityDemographics component.</p>
      <h2>NRC Articles</h2>
      <p>Pull some articles from NRC's ADAMS API</p>
      <hr />
      <h2>View Facility Information</h2>
      <FacilityDropdownMenu />
    </div>
  )
}

export default PMDash

// use class names to target each section w css to style page layout