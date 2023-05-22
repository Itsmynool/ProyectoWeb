import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { UserContext } from '../components/UserContext';

export const NavigationBar = () => {
  const { userId, logout } = useContext(UserContext); // Obtén el estado de inicio de sesión del usuario y la función de cierre de sesión

  return (
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
            {userId ? ( // Verifica si hay un usuario registrado
              <Nav.Item>
                <Nav.Link onClick={logout} className="text-light">Cerrar sesión</Nav.Link>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/Login" className="text-light">Iniciar sesión</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/Register" className="text-light">Registrarse</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
