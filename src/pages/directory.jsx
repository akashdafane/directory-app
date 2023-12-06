import React, { useEffect, useState } from "react";
import "../styles/directory.css";
import MainCards from "./mainCard";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Directory = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setData(res?.data);
      })
      .catch((e) => console.log("error", e));
  }, []);

  // navigate to profile page
  const handleClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <Container>
      <Row>
        <h1>Directory</h1>
        <Col></Col>
        {data &&
          data.length > 0 &&
          data.map((value, index) => (
            <MainCards handleClick={handleClick} key={index} data={value} />
          ))}
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Directory;
