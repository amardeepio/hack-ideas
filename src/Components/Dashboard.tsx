import React from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { FilterBar } from "./FilterBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { IdeaCards } from "./IdeaCards";

export const Dashboard: React.FC = () => {
  const [user, setUser] = useLocalStorage("user", "");
  const history = useHistory();
  if (!user) {
    history.push("/login");
  }
  return (
    <>
      <Header />
      <main className="mt-3 dashboard-main">
        <Row>
          <Col md={12}>
            <Row>
              <Col>
                <FilterBar />
              </Col>
            </Row>
          </Col>
          <Col>
            <IdeaCards />
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  );
};
