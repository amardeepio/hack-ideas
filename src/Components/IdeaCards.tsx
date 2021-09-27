import React, { useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import { colors } from "../constant";
import { updateData } from "../functions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { HackIdea } from "../interfaces/documentData";
import { FormFields } from "../interfaces/form";
import { AlertMessage } from "./AlertMessage";
import { IdeaDetailModal } from "./IdeaDetailModal";
import { Loader } from "./Loader";

export const IdeaCards: React.FC<IdeaCardsProps> = (props: IdeaCardsProps) => {
  const { ideaList, loading } = props;
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const randomColor = () => {
    return colors[Math.round(Math.random() * colors.length)];
  };
  const [user] = useLocalStorage("user", "");
  const handleUpvote = async (id: string, data: HackIdea) => {
    if (data.userId === user) {
      setShowAlert(true);
    } else {
      await updateData(id, { ...data, upvotes: data.upvotes! + 1 });
    }
  };

  const handleToggleModal = (idx: number) => {
    setCurrentIndex(idx);
    setShow(!show);
  };

  const parseDataForModal = (): FormFields | undefined => {
    if (currentIndex !== -1) {
      const { title, tags, description } = ideaList[currentIndex];
      return {
        title,
        tags: tags.join(","),
        description,
      };
    }
  };

  return (
    <>
      <Row>
        {ideaList.map((idea, idx) => (
          <Col lg={3} md={4} sm={6} xs={12}>
            <Card className="card">
              <Card.Body
                className="cursor-pointer"
                title="Click to view"
                onClick={() => handleToggleModal(idx)}
              >
                <Card.Title>{idea.title}</Card.Title>
                <Card.Text>{idea.description.slice(0, 50)}....</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col md={12}>
                    {idea.tags.map((tag: any) => (
                      <Badge bg={randomColor()} className="mx-1">
                        {tag}
                      </Badge>
                    ))}
                  </Col>
                  <Col className="p-0">
                    <span className="upvote-container">
                      <BsHeart
                        onClick={() => handleUpvote(idea.id as string, idea)}
                        className="upvote-icon"
                      />
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
      <AlertMessage
        title="Info"
        message="Cannot upvote your own post"
        bg="info"
        show={showAlert}
        toggleShow={() => setShowAlert(!showAlert)}
      />
      <IdeaDetailModal
        show={show}
        toggleModal={() => setShow(!show)}
        title="Details"
        data={parseDataForModal()}
        id={currentIndex !== -1 ? ideaList[currentIndex].id : undefined}
      />
    </>
  );
};

interface IdeaCardsProps {
  ideaList: HackIdea[];
  loading: boolean;
}
