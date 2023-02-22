import { Link } from "react-router-dom"

function HomePage() {

  return (
    <div>
      <h1>NHPP's Web-Based Licensing</h1>
      <p>I am a:</p>
      Radiation Safety Officer  |  <Link to="PM">NHPP Program Manager</Link>
    </div>
  )
}

export default HomePage