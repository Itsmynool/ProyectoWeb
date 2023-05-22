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
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" />
  </React.StrictMode>,
  document.getElementById('root')
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
              <Route path="/home" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
