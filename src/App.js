import React, { useState } from 'react';
import insec from './pubic/insec.png';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const App = () => {
  const [registerFormData, setRegisterFormData] = useState({
    businessName: '',
    fullName: '',
    email: '',
    password: '',
  });

  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const [dealFormData, setDealFormData] = useState({
    productName: '',
    productDescription: '',
    price: '',
  });

  const [emailFormData, setEmailFormData] = useState({
    from: '',
    to: '',
    subject: '',
    body: '',
  });

  const handleRegisterChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDealChange = (e) => {
    setDealFormData({
      ...dealFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setEmailFormData({
      ...emailFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Registration form submitted:', registerFormData);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted:', loginFormData);
  };

  const handleDealSubmit = (e) => {
    e.preventDefault();
    // Add your create deal logic here
    console.log('Create Deal form submitted:', dealFormData);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add your send email logic here
    console.log('Send Email form submitted:', emailFormData);
  };

  return (
    <Container className="mt-5">
      <div className="text-center mt-5">
        <img src={insec} alt="My Logo" />
      </div>
      <Row>
        <Col>
          <h2>Register</h2>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group controlId="formBusinessName">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter business name"
                name="businessName"
                value={registerFormData.businessName}
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullName"
                value={registerFormData.fullName}
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={registerFormData.email}
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={registerFormData.password}
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>

        <Col>
          <h2>Login</h2>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="loginEmail"
                value={loginFormData.loginEmail}
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="loginPassword"
                value={loginFormData.loginPassword}
                onChange={handleLoginChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2>Create New Deal</h2>
          <Form onSubmit={handleDealSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={dealFormData.productName}
                onChange={handleDealChange}
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                name="productDescription"
                value={dealFormData.productDescription}
                onChange={handleDealChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={dealFormData.price}
                onChange={handleDealChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Deal
            </Button>
          </Form>
        </Col>

        <Col>
          <h2>Send Email</h2>
          <Form onSubmit={handleEmailSubmit}>
            <Form.Group controlId="formFrom">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="from"
                value={emailFormData.from}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group controlId="formTo">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter recipient's email"
                name="to"
                value={emailFormData.to}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email subject"
                name="subject"
                value={emailFormData.subject}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group controlId="formBody">
              <Form.Label>Body Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter email body"
                name="body"
                value={emailFormData.body}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Email
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
