import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import PMDashboard from "../components/PMDashboard"
import RSODashboard from "../components/RSODashboard"

function HomePage() {

  const [user, setUser] = useState()
  const [staff, setStaff] = useState()
  const [RSO, setRSO] = useState()

  useEffect( () => {
    async function fetchUserDetails() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const base_url = process.env.REACT_APP_BASE_URL
          const response = await fetch(`http://127.0.0.1:8000/api/accounts/details`, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            throw new Error('Failed to fetch user details');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // redirect user to login page if not authenticated
        window.location.href = '/login';
      }
    }
    fetchUserDetails();
  }, []);

  useEffect( () => {
    if(user) {
      if (user.is_staff) {
        setStaff("True")
      } else {
        const office_code = user.office_code
        setRSO(office_code)
      }
    }
  }, [user]);
 
  // console.log(RSO)
  return (
    <div>
      <Container>
      {staff &&
        <Row>
          <Col>
          <PMDashboard />
          </Col>
        </Row>
      }
      {RSO &&
        <Row>
          <Col>
          <RSODashboard office_code={RSO}/>
          </Col>
        </Row>
      }
       </Container>
    </div>
  )
}

export default HomePage