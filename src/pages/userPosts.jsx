import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const PostComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Limiting to the first 9 posts for demonstration purposes
        setPosts(data.slice(0, 9));
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const renderPosts = () => {
    return posts.map((post) => (
      <Col key={post.id} xs={12} md={4}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Container>
      <h2 className="text-center mb-4">Posts</h2>
      {/* Displaying posts in a row */}
      <Row>{renderPosts()}</Row>
    </Container>
  );
};

export default PostComponent;
