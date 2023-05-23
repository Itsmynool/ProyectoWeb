import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './Views/Home';
import { Login } from './Views/Login';
import { Register } from './Views/Register';
import { Users } from './components/Users';
import { NavigationBar } from './components/NavigationBar';
import { UserProvider } from './components/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" />
  </React.StrictMode>
);

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <NavigationBar />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </Layout>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
