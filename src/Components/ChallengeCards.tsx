import React, { useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { colors } from "../constant";
import { updateData } from "../functions";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { HackIdea } from "../interfaces/documentData";
import { AlertMessage } from "./AlertMessage";
import { ChallengeDetailModal } from "./ChallengeDetailModal";
import { Loader } from "./Loader";
import { UpvoteButton } from "./UpvoteButton";

export const ChallengeCards: React.FC<ChallengeCardsProps> = (
  props: ChallengeCardsProps
) => {
  const { ideaList, loading, updateList } = props;
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [alertMessage, setAlertMessage] = useState("");
  const randomColor = () => {
    return colors[Math.round(Math.random() * colors.length)];
  };
  const [user] = useLocalStorage("user", "");
  const handleUpvote = async (idx: number) => {
    if (ideaList[idx].userId === user) {
      setAlertMessage("Cannot upvote your own post");
      setShowAlert(true);
    } else {
      setAlertMessage("Upvoted!");
      setShowAlert(true);
      let { upvotedBy, upvotes } = ideaList[idx];
      const upvotedBySet = new Set(upvotedBy)
      if (upvotes){
        if (upvotedBySet.has(user)){
          upvotes--;
          upvotedBySet.delete(user)
        }
        else{
          upvotes++;
          upvotedBySet.add(user);
        }
      }
      await updateData(ideaList[idx].id || "", {
        ...ideaList[idx],
        upvotes,
        upvotedBy: Array.from(upvotedBySet),
      });
      await updateList();
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

  const checkForUserUpvote = (idx: number) => {
    if (ideaList[idx].upvotedBy?.includes(user)) {
      return true;
    }
    return false;
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
                    <UpvoteButton
                      liked={checkForUserUpvote(idx)}
                      handleUpvote={() => handleUpvote(idx)}
                      index={idx}
                      upvotes={idea.upvotes || 0}
                    />
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
        message={alertMessage}
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
