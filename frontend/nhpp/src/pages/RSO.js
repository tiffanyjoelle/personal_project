import AddRSOForm from "../components/AddRSO"
import EditRSOForm from "../components/EditRSO"
import PMNavBar from "../components/PMNavBar"
import { Row, Col } from "react-bootstrap"

function RSO(props) {
  
  return (
    <div>
      <Row>
      <Col><EditRSOForm rso={props.rso}/></Col>
      <Col><AddRSOForm permitID={props.permitID}/></Col>
      </Row>
    </div>
  )
}

export default RSO