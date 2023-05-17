import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

export const NavigationBar = () => (
  <Container>
    <Navbar bg="warning" variant="dark">
      <Navbar.Brand href="/">Arepas</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link href="./Home" className="text-light">Inicio</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className="ms-auto">
          <Nav.Item>
            <Nav.Link href="/Login" className="text-light">Iniciar sesión</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Register" className="text-light">Registrarse</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Container>
);
