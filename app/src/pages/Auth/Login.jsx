import React from "react";
import { Container, Col, Card } from "react-bootstrap";
import Form from "./components/Form";

const Login = () => {
  return (
    <Container fluid className="mt-5">
      <Col xl="4" sm="12" md="8" className="mx-auto">
        <Card className="shadow py-5">
          <Card.Body>
            <h5 className="text-center">
              Bienvenido, inicia sesion para continuar
            </h5>
            <Form />
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Login;
