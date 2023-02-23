import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//pages
import HomePage from './pages/HomePage';
import RSODash from './pages/RSODash';
import PMDash from './pages/PMDash';
import ViewPermit from './pages/ViewPermit';
import AddPermit from './pages/AddPermit';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RSO/:rsoID" element={<RSODash />} />
        {/* <Route path="/RSO/:rsoID" element={<EditRSO />} /> */}
        <Route path="/PM" element={<PMDash />} />
        <Route path="/permit/new" element={<AddPermit />} />
        <Route path="/permit/:permitID" element={<ViewPermit />} />
      </Routes>
    </Router>
  );
}

export default App;
