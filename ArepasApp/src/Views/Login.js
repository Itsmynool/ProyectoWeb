import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Login = () => (
  <Container className="my-5">
    <Row className="justify-content-center">
      <Col md={6} lg={5}>
        <Card>
          <Card.Header className="bg-primary text-white text-center">
            <h4>Iniciar sesión</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control type="email" name="email" required placeholder="Ingrese su correo electrónico" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name="password" required placeholder="Ingrese su contraseña" />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">Ingresar</Button>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center">
            <p>No tienes cuenta? <Link to="/register">Regístrate</Link></p>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
);
