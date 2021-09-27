import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import { AddIdeaModal } from "./AddIdeaModal";
import { MdMessage } from "react-icons/md";
import { useLocation } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const location = useLocation();
  const [user, setUser] = useLocalStorage("user", "");
  const AddIdeaButon = () => {
    const path = window.location.pathname;
    if (path === "/" && user)
      return (
        <Button onClick={toggleModal} className="primary-bg">
          <MdAdd /> <span className="font-bold p">Add Idea</span>
        </Button>
      );
    return <></>;
  };
  return (
    <>
      <header className="header">
        <Row>
          <Col md={3}>
            <span className="h3 primary-text">
              <MdMessage />
              Hack
            </span>{" "}
            <span className="h4"> Ideas</span>
          </Col>
          <Col md={3}></Col>
          <Col md={6}>
            <AddIdeaButon />
          </Col>
        </Row>
      </header>
      <AddIdeaModal show={show} toggleModal={toggleModal} />
    </>
  );
};
