import { Table, Button, Col, Row } from 'react-bootstrap';

function MaterialsList(props) {

  return (
    <div>
    {props.permitInfo && 
    <div>
      <h3>Materials:</h3>
      <Table bordered hover>
        <thead>
          {props.permitInfo.material.map((use) => (
            <tr key={use.id}>
              <td key={use.source.id}>{use.source}</td>
              <td key={use.form.id}>{use.form}</td>
              <td key={use.amount_of_source.id}>{use.amount_of_source}</td>
            </tr>
        ))}
        </thead>
      </Table>
    </div>
    }
    </div>
  )
}

export default MaterialsList