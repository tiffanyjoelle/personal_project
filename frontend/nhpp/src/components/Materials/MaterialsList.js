import { Table, Accordion } from 'react-bootstrap';
import AddMaterialForm from './AddMaterial';
import EditMaterialsForm from './EditMaterialsList';

function MaterialsList(props) {

  return (
    <div>
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Edit Permit Materials</Accordion.Header>
        <Accordion.Body>
        <EditMaterialsForm editPermitInfo={props.editPermitInfo}/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add New Material to Selection List</Accordion.Header>
        <Accordion.Body>
        <AddMaterialForm />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <br />
    {props.permitInfo && 
    <div>
      <h4>Materials:</h4>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Byproduct, source, and/or special nuclear material</th>
            <th>Chemical and/or physical form</th>
            <th>Maximum amount permittee may possess</th>
          </tr>
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