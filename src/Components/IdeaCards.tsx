import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
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

  const randomColor = () => {
    const colors = ["primary", "secondary", "success", "warning", "danger", "info", "dark"];
    return colors[Math.round(Math.random() * colors.length)]
  }

  return (
    <>
      <Row>
        {ideaList.map((idea) => (
          <Col lg={3} md={4} sm={6} xs={12}>
            <Card className="card">
              <Card.Body>
                <Card.Title>{idea.title}</Card.Title>
                <Card.Text>{idea.description.slice(0,50)}....</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col md={12}>
                    {idea.tags.map((tag: any) => (
                      <Badge bg={randomColor()} className="mx-1">{tag}</Badge>
                    ))}
                  </Col>
                  <Col className="p-0">
                    <span className="upvote-icon">
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
