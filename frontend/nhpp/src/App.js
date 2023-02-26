import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import HomePage from './pages/HomePage';
import ViewPermitDoc from './pages/ViewPermitDoc';
import AddPermit from './pages/AddPermit';
import EditPermit from './pages/EditPermit';
import Login from './pages/UserLogin';
import Signup from './pages/UserSignup';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/RSO/:office_code" element={<RSODash />} /> */}
        {/* <Route path="/RSO/:rsoID" element={<EditRSO />} /> */}
        <Route path="/PM/permit/new" element={<AddPermit />} />
        <Route path="PM/permit/:office_code/edit" element={<EditPermit />} />
        <Route path="/permit/:office_code/view" element={<ViewPermitDoc />} />
      </Routes>
    </Router>
  );
}

export default App;
