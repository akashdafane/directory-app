import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const UserNameCards = ({ data = {} }) => {
  return (
    <div className="card">
      <Container>
        <Row>
          <Col>
            <h2 className="card-title">Name: {data?.name}</h2>
            <h2 className="card-title">UserName:{data?.username}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="card-title">Email: {data?.email}</h2>
            <h2 className="card-title">City: {data?.address?.city}</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserNameCards;
