import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    if (firstName && lastName && username && password && confirmPassword && email && address && phone) {
      const newUser = {
        id: null,
        firstName,
        lastName,
        username,
        password,
        email,
        address,
        phone,
        paymentMethod: {
          cardType: cardType || '',
          cardNumber: cardNumber || '',
          securityCode: securityCode || ''
        }
      };

      fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Registro exitoso');
          setSuccess(true);
          setFirstName('');
          setLastName('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setEmail('');
          setAddress('');
          setPhone('');
          setCardType('');
          setCardNumber('');
          setSecurityCode('');
        })
        .catch(error => {
          console.log('Error al registrar:', error);
        });
    }
  };

  return (
    <Container className="my-5">
    <Row className="justify-content-center">
      <Col md={6} lg={5}>
        <Card>
          <Card.Header className="bg-primary text-white text-center">
            <h4>Registro</h4>
          </Card.Header>
          <Card.Body>
            {success && <p>Registro exitoso. Por favor, inicie sesión.</p>}
            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="username">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirmar contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="cardType">
                <Form.Label>Tipo de tarjeta</Form.Label>
                <Form.Control
                  as="select"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                >
                  <option value="">Tipo de tarjeta</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="cardNumber">
                <Form.Label>Número de tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Número de tarjeta"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="securityCode">
                <Form.Label>Código de seguridad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código de seguridad"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleRegister}>
                Registrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </Container>
  );
};

export default Register;

