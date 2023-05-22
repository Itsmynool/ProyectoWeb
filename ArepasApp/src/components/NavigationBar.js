import React, { useContext } from 'react';
import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import { UserContext } from '../components/UserContext';

export const NavigationBar = () => {
  const { userId, logout } = useContext(UserContext); // Obtén el estado de inicio de sesión del usuario y la función de cierre de sesión

  return (
    <Navbar bg="warning" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">
          <Image src="https://arepaselpaisapty.com/wp-content/uploads/2022/11/AREPAS-EL-PAISA-LOGO-FINAL-BLANCO-1024x1019.png" alt="Logo" width="30" height="30" /> {/* Aquí se agrega la imagen */}
        </Navbar.Brand>
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
      </Container>
    </Navbar>
  );
};
