import FacilityDropdownMenu from "./FacilityDropdownMenu"
import { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import PMNavBar from "./PMNavBar";

function PMDashboard() {

  const [facilities, setFacilities] = useState('')
  const [articles, setArticles] = useState()

  useEffect( () => {
    async function getFacilities() {
      const base_url = process.env.REACT_APP_BASE_URL
      const response = await fetch(`http://${base_url}/api`)
      const body = await res.json()
      // console.log(body.result)
      setFacilities(body.result)
    }
    getFacilities()
  }, [])

  // useEffect( () => {
  //   async function getNRCArticles() {
  //     try {
  //     const base_url = process.env.REACT_APP_BASE_URL
  //     const response = await fetch(`http://${base_url}/api/nrc')
  //     const body = await res.json()
  //     // console.log(body.result)
  //     setArticles(body.documents.slice(0,10))
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getNRCArticles()
  // }, [])

  return (
    <div>
      <PMNavBar />
        <Row>
          <h1>Program Manager Dashboard</h1>
        </Row>
        <hr />
      <Row style={{backgroundColor: '#F5F5F5'}}><FacilityDropdownMenu facilities={facilities}/></Row>
     
      <Row style={{ display: 'flex', marginTop: '1.5rem'}}>
      <h2>NRC Documents Related to the VA</h2>
      <hr />
      {articles &&
      <>
        {articles.map((article, index) => (
          <div key={index}>
          <h4>{article.title}</h4>
          <p><a href={article.url}>View Document</a></p>
          <hr />
          </div>
        ))}
      </>
      }
      </Row>
    </div>
  )
}

export default PMDashboard

// use class names to target each section w css to style page layout