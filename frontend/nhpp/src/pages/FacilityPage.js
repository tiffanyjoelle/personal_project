import { useParams } from "react-router-dom"
import FacilityDemographics from "../components/FacilityDemographics"

function FacilityPage() {

  let facilityID = useParams()
  
  return (
    <div>
      <FacilityDemographics facilityID={facilityID.facilityID} />
      <p>NHPP PM Options:<button>Edit facility RAM info</button><button>Generate facility RAM permit</button></p>
    </div>
  )
}

export default FacilityPage