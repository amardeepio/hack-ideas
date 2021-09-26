import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import { getData } from "../functions";
import { HackIdea } from "../interfaces/documentData";
import { Loader } from "./Loader";

export const IdeaCards: React.FC = () => {
  const [ideaList, setIdeaList] = useState<HackIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const data = await getData();
    setLoading(false);
    setIdeaList(data as unknown as HackIdea[]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Row>
        {ideaList.map((idea) => (
          <Col lg={3} md={4} sm={6} xs={12}>
            <Card className="card">
              <Card.Body>
                <Card.Title>{idea.title}</Card.Title>
                <Card.Text>{idea.description.slice(0,100)}....</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col md={12}>
                    {idea.tags.map((tag: any) => (
                      <Badge bg="primary">{tag}</Badge>
                    ))}
                  </Col>
                  <Col>
                    <span>
                      <BsHeart />
                      {idea.upvotes}
                    </span>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      {loading && <Loader />}
    </>
  );
};
