import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function ReplaceRsoForm(props) {

  // states and params
  let { office_code } = useParams()
  const [editPermitInfo, setEditPermitInfo] = useState(props.editPermitInfo)
  const [permitData, setPermitData] = useState({
    primary_rso: "",
  });
  const [rso, setRSO] = useState([]);

  // useEffects and handleChanges
  const handleChange = (event) => {
    const { name, value } = event.target
    setPermitData({ ...permitData, [name]: value })
  }
  
  // useEffect( () => {
  //   async function getPermitInfo() {
  //     const base_url = process.env.REACT_APP_BASE_URL
  //     const response = await fetch(`http://127.0.0.1:8000/api/${office_code}/edit`)
  //     const body = await response.json()
  //     setPermitInfo(body.result)
  //   }
  //   getPermitInfo()
  // }, [])

  useEffect(() => {
    if (editPermitInfo) {
      setPermitData({
        primary_rso: editPermitInfo.primary_rso,
      });
    }
  }, [editPermitInfo]);

  useEffect(() => {
    async function fetchRSOs() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://127.0.0.1:8000/api/RSO`)
      const data = await response.json();
      setRSO(data.result)
    }
    fetchRSOs();
  }, []);

  // handle submit
  async function handleReplaceRsoSubmit(event) {
    event.preventDefault();
    //compile data to send
    const data = {
      primary_rso: permitData.primary_rso,
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

  return (
    <div>
      <Container>
        {permitData &&
    <Form>
      <Row>
      <Form.Group>
        <Form.Select id="primary_rso" name='primary_rso' value={permitData.primary_rso} onChange={handleChange}>{rso.map(rso => (
          <option key={rso.id} value={rso.id}>{rso.last_name}, {rso.first_name}</option>
        ))}</Form.Select>
      </Form.Group>
      </Row>
      <Row>
        <Col>
        <hr />
        <Button onClick={handleReplaceRsoSubmit}>Update RSO</Button>
        </Col>
      </Row>
      </Form>
}
    </Container>
    </div>
  );
}

export default ReplaceRsoForm