import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const products = [
  {
    id: 1,
    name: 'Producto 1',
    price: 19.99,
    image: 'https://www.cdc.gov/foodsafety/es/images/chicken-1091281658.jpg?_=58385',
  },
  {
    id: 2,
    name: 'Producto 2',
    price: 29.99,
    image: 'https://www.cdc.gov/foodsafety/es/images/chicken-1091281658.jpg?_=58385',
  },
  {
    id: 3,
    name: 'Producto 3',
    price: 39.99,
    image: 'https://www.cdc.gov/foodsafety/es/images/chicken-1091281658.jpg?_=58385',
  },
];

export const Home = () => {
  const [quantities, setQuantities] = useState(Array(products.length).fill(0));

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
      setQuantities(newQuantities);
    }
  };

  return (
    <Container className="my-5">
      <h1>Productos en venta</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card style={{ backgroundColor: '#f2f2f2', border: '1px solid black' }}>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', fontFamily: 'Arial', fontWeight: 'bold' }}>
                  Precio: ${product.price}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Button variant="primary" onClick={() => handleDecrement(index)}>-</Button>
                    <span className="mx-2">{quantities[index]}</span>
                    <Button variant="primary" onClick={() => handleIncrement(index)}>+</Button>
                  </div>
                  <Button variant="primary">Comprar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
