import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

//pages
import HomePage from './pages/HomePage';
import PermitView from './pages/PermitView';
import AddPermit from './pages/AddPermit';
import EditPermit from './pages/EditPermit';
import Login from './pages/UserLogin';
import Signup from './pages/UserSignup';
import AddRSO from './pages/AddRSO';
import EditRSO from './pages/EditRSO';
import AddAUForm from './pages/AddAU';
import AddAuthorizedUseForm from './pages/AddAuthorizedUse';
import AddMaterialsForm from './pages/AddMaterial';
import AddPermitProgramForm from './pages/AddPermitProgram';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/RSO/new" element={<AddRSO />} />
        <Route path="/RSO/:rsoID" element={<EditRSO />} />
        <Route path="/AU/new" element={<AddAUForm />} />
        <Route path="/use/new" element={<AddAuthorizedUseForm />} />
        <Route path="/material/new" element={<AddMaterialsForm  />} />
        <Route path="/permit_program/new" element={<AddPermitProgramForm />} />
        <Route path="/permit/new" element={<AddPermit />} />
        <Route path="/permit/:office_code" element={<PermitView />} />
        <Route path="/permit/:office_code/edit" element={<EditPermit />} />
      </Routes>
    </Router>
  );
}

export default App;
