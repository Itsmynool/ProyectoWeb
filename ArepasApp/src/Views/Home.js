import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);

  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  // Obtiene los índices de los productos correspondientes a la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambia de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="my-5">
      <h1>Productos en venta</h1>
      <Row>
        {currentProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card style={{ backgroundColor: '#f2f2f2', border: '1px solid black' }}>
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{ fontSize: '0.8rem', fontFamily: 'Arial', fontWeight: 'normal' }}>
                  {product.info}
                </Card.Text>
                <Card.Text style={{ fontSize: '1.5rem', fontFamily: 'Arial', fontWeight: 'bold' }}>
                  ${product.price}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="primary" className="me-2">Añadir al carrito</Button>
                  <Button variant="success">Comprar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="mt-4">
        {Array(Math.ceil(products.length / productsPerPage))
          .fill()
          .map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
      </Pagination>
    </Container>
  );
};
