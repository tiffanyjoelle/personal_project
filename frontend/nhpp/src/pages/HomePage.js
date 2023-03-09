import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import PMDashboard from "../components/PMDashboard"
import RSODashboard from "../components/RSODashboard"

function HomePage() {

  const [user, setUser] = useState()
  const [staff, setStaff] = useState()
  const [officeCode, setOfficeCode] = useState()

  useEffect( () => {
    async function fetchUserDetails() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const base_url = process.env.REACT_APP_BASE_URL
          const response = await fetch(`http://${base_url}/api/accounts/details`, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            alert('Failed to fetch user details');
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
  // console.log(user)
  useEffect( () => {
    if(user) {
      if (user.is_staff) {
        setStaff("True")
      } else {
        const office_code = user.office_code
        setOfficeCode(office_code)
      }
    }
  }, [user]);
 
  // console.log(officeCode)
  return (
    <div>
      {user ? 
      <Container>
      {staff &&
        <Row>
          <Col>
          <PMDashboard />
          </Col>
        </Row>
      }
      {officeCode &&
        <Row>
          <Col>
          <RSODashboard office_code={officeCode}/>
          </Col>
        </Row>
      }
       </Container>
       :
       <div>Loading...</div>
    }
    </div>
  )
}

export default HomePage