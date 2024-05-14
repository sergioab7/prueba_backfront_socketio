// App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { Dashboard } from './components/Dashboard';

const socket = io(`http://localhost:4000`);

function App() {
  return (
    <Router>
      <div className="container">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
