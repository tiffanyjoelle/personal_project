import { Link } from "react-router-dom"

function HomePage() {
  return (
    <div>
      <h1>NHPP's Web-Based Licensing</h1>
      <p>I am a:</p>
      <Link to="RSO/528A8">Radiation Safety Officer</Link>  |  <Link to="PM">NHPP Program Manager</Link>
    </div>
  )
}

export default HomePage