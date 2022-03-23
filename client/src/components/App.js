import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';



function App() {
  return (
    <Router>
    <div>
            {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Routes>
        <Route path="/register" element={<RegisterPage />}/>
          
        <Route path="/login" element={<LoginPage/>}/>
         
        
        <Route path="/"  element={<LandingPage/>}/>
          
          
        
      </Routes>
    </div>
  </Router>
  );
}
export default App;