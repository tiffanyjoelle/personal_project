import FacilityDropdownMenu from "./FacilityDropdownMenu"
import { useState, useEffect } from "react";
import { Row, Carousel } from 'react-bootstrap';
import PMNavBar from "./PMNavBar";

function PMDashboard() {

  const [facilities, setFacilities] = useState('')
  const [articles, setArticles] = useState()

  useEffect( () => {
    async function getFacilities() {
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch('http://127.0.0.1:8000/api/')
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
  //     const res = await fetch(`http://127.0.0.1:8000/api/nrc`)
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
        <Row>
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </Row>
        <hr />
     
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