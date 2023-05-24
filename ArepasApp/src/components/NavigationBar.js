import React, { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav, Image } from 'react-bootstrap';
import { UserContext } from '../components/UserContext';
import './NavigationBar.css'; // Importa el archivo CSS para los estilos personalizados

export const NavigationBar = () => {
  const { userId, logout } = useContext(UserContext); // Obtén el estado de inicio de sesión del usuario y la función de cierre de sesión
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setUserName(data.firstName); // Cambiar 'data.userName' a 'data.name'
        })
        .catch(error => {
          console.log('Error retrieving user data:', error);
        });
    }
  }, [userId]); 

  return (
    <Navbar bg="warning" variant="dark" expand="md" className="navbar-container"> {/* Agrega la clase "navbar-container" */}
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"> {/* Agrega la clase "mr-auto" al contenedor de enlaces */}
            <Nav.Item>
              <Nav.Link href="/Home" className="text-light"><Image src="https://arepaselpaisapty.com/wp-content/uploads/2022/11/AREPAS-EL-PAISA-LOGO-FINAL-BLANCO-1024x1019.png" alt="Logo" width="50" height="50" /> {/* Ajusta las dimensiones del logo */}</Nav.Link>
            </Nav.Item>
            {userId && (
              <Nav.Item>
                <Nav.Link className="text-light">Bienvenido, {userName}</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          <Nav className="ms-auto">
            {userId ? (
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
