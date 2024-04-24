
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main';

import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Router>
  );
}

export default App;
