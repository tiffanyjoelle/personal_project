import { Button } from "react-bootstrap";
import PermitDoc from "./PermitDoc";
import ReactDOM from 'react-dom';

function PermitDocComponent(props) {

  const handleClick = () => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.title = "Permit Document";
    ReactDOM.render(<PermitDoc permitInfo={props.permitInfo} facilityInfo={props.facilityInfo}/>, newWindow.document.body);
    newWindow.print()
  };

  return (
    <div>
      <Button onClick={handleClick}>Print Permit</Button>
      <br /><br />
      <PermitDoc facilityInfo={props.facilityInfo} permitInfo={props.permitInfo} />
    </div>
  )
}

export default PermitDocComponent

