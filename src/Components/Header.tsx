import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
import { IdeaDetailModal } from "./IdeaDetailModal";
import { MdMessage } from "react-icons/md";
import { useHistory } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { BiLogOut } from "react-icons/bi";

export const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const history = useHistory();
  const [user, setUser] = useLocalStorage("user", "");
  const handleLogOut = async() => {
    await setUser("");
    history.push("/login");
  };
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
  const LogoutButton = () => {
    if (user) {
      return (
        <div
          className="float-right cursor-pointer"
          title="Logout"
          
        >
          <BiLogOut className="logout-button"onClick={handleLogOut} />
        </div>
      );
    }
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
          <Col md={4}></Col>

          <Col md={5}>
            <AddIdeaButon />
            <LogoutButton />
          </Col>
        </Row>
      </header>
      <IdeaDetailModal show={show} toggleModal={toggleModal} title="Add Idea" />
    </>
  );
};
