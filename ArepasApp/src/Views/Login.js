import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../components/UserContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { loggedIn, login } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/Home');
    }
  }, [loggedIn, navigate]);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch('http://localhost:8000/users?username=' + username)
        .then((res) => res.json())
        .then((resp) => {
          if (resp.length === 0) {
            setShowErrorAlert(true);
            toast.error('Por favor ingresa un usuario válido');
          } else {
            const user = resp[0];
            if (user.password === password && user.username === username) {
              login(user);
              toast.success('Inicio de sesión exitoso');
            } else {
              setShowErrorAlert(true);
              toast.error('Credenciales incorrectas');
            }
          }
        })
        .catch((err) => {
          setShowErrorAlert(true);
          toast.error('Inicio de sesión fallido');
        });
    }
  };

  const validate = () => {
    let result = true;

    if (username === '' || username === null) {
      result = false;
      toast.warning('Por favor ingresa un nombre de usuario');
    }
    if (password === '' || password === null) {
      result = false;
      toast.warning('Por favor ingresa una contraseña');
    }

    return result;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card>
            <Card.Header className="bg-warning text-white text-center">
              <h4>Iniciar sesión</h4>
            </Card.Header>
            <Card.Body>
              {showErrorAlert && (
                <Alert variant="danger">
                  Credenciales incorrectas o datos erróneos.
                </Alert>
              )}
              <Form onSubmit={proceedLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nombre de usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    required
                    placeholder="Ingrese su nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    required
                    placeholder="Ingrese su contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit" className="bg-warning">
                    Ingresar
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <p>
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
