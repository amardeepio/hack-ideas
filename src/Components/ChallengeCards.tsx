import React, { useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { BsHeart } from "react-icons/bs";
import { colors } from "../constant";
import { updateData } from "../functions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { HackIdea } from "../interfaces/documentData";
import { AlertMessage } from "./AlertMessage";
import { ChallengeDetailModal } from "./ChallengeDetailModal";
import { Loader } from "./Loader";

export const ChallengeCards: React.FC<ChallengeCardsProps> = (
  props: ChallengeCardsProps
) => {
  const { ideaList, loading, updateList } = props;
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
      updateList();
    }
  };

  const handleToggleModal = (idx: number) => {
    setCurrentIndex(idx);
    setShow(!show);
  };

  const parseDataForModal = (): HackIdea | undefined => {
    if (currentIndex !== -1) {
      return {
        ...ideaList[currentIndex],
      };
    }
  };

  const handleCloseModal = () => {
    setCurrentIndex(-1);
    setShow(!show);
  };

  return (
    <>
      <div className="grid-container">
        {ideaList.map((idea, idx) => (
          <div className="grid-col">
            <Card className="card">
              <Card.Body
                className="cursor-pointer"
                title="Click to view"
                onClick={() => handleToggleModal(idx)}
              >
                <Card.Title>{idea.title}</Card.Title>
                <Card.Text>
                  {idea.description.length > 50
                    ? idea.description.slice(0, 50) + "...."
                    : idea.description}
                </Card.Text>
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
          </div>
        ))}
      </div>
      {loading && <Loader />}
      <AlertMessage
        title="Info"
        message="Cannot upvote your own post"
        bg="info"
        show={showAlert}
        toggleShow={() => setShowAlert(!showAlert)}
      />
      <ChallengeDetailModal
        show={show}
        toggleModal={handleCloseModal}
        title="Details"
        data={parseDataForModal()}
        id={currentIndex !== -1 ? ideaList[currentIndex].id : undefined}
        updateList={updateList}
      />
    </>
  );
};

interface ChallengeCardsProps {
  ideaList: HackIdea[];
  loading: boolean;
  updateList: () => Promise<void>;
}
