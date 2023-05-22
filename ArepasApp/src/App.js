import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { NoMatch } from './components/NoMatch';
import { Home } from './Views/Home';
import { Login } from './Views/Login';
import { Register } from './Views/Register';
import { Users } from './components/Users';
import { NavigationBar } from './components/NavigationBar';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/Home" element={<Home/>} />
              <Route path="/Users" element={<Users/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/Register" element={<Register/>} />
              <Route element={<NoMatch/>} />
            </Routes>
          </Router>
        </Layout>
      </React.Fragment>
    </div>
  );
}

export default App;