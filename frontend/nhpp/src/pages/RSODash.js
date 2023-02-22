import FacilityDemographics from "../components/FacilityDemographics"
import { useParams } from "react-router-dom"

function RSODash() {

  let facilityID = useParams()

  return (
    <div>
      <h1>RSO Dashboard</h1>
      <p> RSOs can only see base FacilityDemographics component, which will allow for editing RSO contact info.</p>
      <p>Will need to pass facilityID parameter automatically from login, perhaps something I can pass w the django login permissions??</p>
      <FacilityDemographics facilityID={facilityID.facilityID}/>
    </div>
  )
}

export default RSODash