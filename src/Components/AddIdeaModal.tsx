import { Modal, Button } from "react-bootstrap";
import React from "react";

export const AddIdeaModal: React.FC<AddIdeaModalProps> = (props: AddIdeaModalProps) => {
    const {show, toggleModal} = props;
  return (
    <Modal show={show} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={toggleModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

interface AddIdeaModalProps {
    show: boolean;
    toggleModal: () => void;
}