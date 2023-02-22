import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

//pages
import HomePage from './pages/HomePage';
import FacilityPage from './pages/FacilityPage';
import RSODash from './pages/RSODash';
import PMDash from './pages/PMDash';
import ViewPermit from './pages/ViewPermit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RSO/:facilityID" element={<RSODash />} />
        <Route path="/PM" element={<PMDash />} />
        <Route path="/view_permit" element={<ViewPermit />} />
        {/* <Route path="/facilities/:facilityID" element={<FacilityPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
