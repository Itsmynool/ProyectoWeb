import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import './Home.css'; // Importa el archivo CSS para los estilos personalizados

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (productId) => {
    const quantity = selectedQuantities[productId] || 0;
    console.log(`Product ${productId} added to cart with quantity: ${quantity}`);
  };

  const handleViewMore = (productId) => {
    console.log(`View more details for product ${productId}`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderProductImage = (image) => {
    return <Card.Img variant="top" src={image} alt="Product" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />;
  };

  const renderProductInfo = (info) => {
    return info.length > 50 ? info.substring(0, 50) + '...' : info;
  };

  const renderProductPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <Container className="my-5">
      <h1>Productos en venta</h1>
      <Row>
        {currentProducts.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card style={{ backgroundColor: '#f2f2f2', border: '1px solid black' }}>
              {renderProductImage(product.image)}
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text style={{ fontSize: '0.8rem', fontFamily: 'Arial', fontWeight: 'normal' }}>
                  {renderProductInfo(product.info)}
                </Card.Text>
                <Card.Text style={{ fontSize: '1.5rem', fontFamily: 'Arial', fontWeight: 'bold' }}>
                  {renderProductPrice(product.price)}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="me-2">
                      <span className="quantity-label">Cantidad:</span>
                      <input
                        type="number"
                        min="0"
                        value={selectedQuantities[product.id] || ''}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        className="quantity-input" // Agrega la clase CSS "quantity-input"
                      />
                    </div>
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleAddToCart(product.id)}> {/* Modifica el tamaño del botón a "sm" y agrega la clase CSS "me-2" */}
                      Añadir al carrito
                    </Button>
                  </div>
                  <Button variant="success" size="sm" onClick={() => handleViewMore(product.id)}> {/* Modifica el tamaño del botón a "sm" */}
                    Ver más
                  </Button>
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
