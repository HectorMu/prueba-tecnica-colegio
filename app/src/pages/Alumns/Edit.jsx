import React from "react";
import { Col, Container, Card } from "react-bootstrap";
import Form from "./components/Form";

const Edit = () => {
  return (
    <Container fluid className="mt-5">
      <Col xl="8" className="mx-auto shadow">
        <Card>
          <Card.Body>
            <Form />
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Edit;
