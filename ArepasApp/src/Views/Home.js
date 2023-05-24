import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Pagination, Modal } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    const newQuantity = Math.max(0, quantity); // Prevent quantity from going below zero
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleAddToCart = (productId) => {
    const quantity = selectedQuantities[productId] || 0;
    console.log(`Product ${productId} added to cart with quantity: ${quantity}`);
  };

  const handleViewMore = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleBuy = (productId) => {
    console.log(`Product ${productId} purchased`);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderProductImage = (image) => {
    return (
      <Card.Img
        variant="top"
        src={image}
        alt="Product"
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
    );
  };

  const renderProductInfo = (info) => {
    return info.length > 50 ? info.substring(0, 50) + '...' : info;
  };

  const renderProductPrice = (price) => {
    return (
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
        ${price.toFixed(2)}
      </span>
    );
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
                  <div className="d-flex align-items-center quantity-container">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="quantity-button"
                      onClick={() =>
                        handleQuantityChange(product.id, (selectedQuantities[product.id] || 0) - 1)
                      }
                    >
                      -
                    </Button>
                    <div className="quantity-label">
                      <span className="quantity-text">Cantidad:</span>
                      <span className="quantity-value">{selectedQuantities[product.id] || 0}</span>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="quantity-button"
                      onClick={() =>
                        handleQuantityChange(product.id, (selectedQuantities[product.id] || 0) + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                  <Button variant="success" size="sm" onClick={() => handleViewMore(product.id)}>
                    Ver más
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleBuy(product.id)}
                    className="mr-auto"
                  >
                    Comprar
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(product.id)}
                    className="ml-auto"
                  >
                    Añadir al carrito
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

      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <Link to="/cart"> {/* Añade el enlace al carrito */}
          <Button
            variant="primary"
            size="lg"
            style={{ borderRadius: '50%', width: '60px', height: '60px' }}
          >
            <BsCart3 style={{ fontSize: '1.5rem' }} />
          </Button>
        </Link>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        {selectedProduct && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-center mb-3">
                {renderProductImage(selectedProduct.image)}
              </div>
              <div>{selectedProduct.info}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                {renderProductPrice(selectedProduct.price)}
              </div>
              {/* Add additional information about the product here */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Home;
