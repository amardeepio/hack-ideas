import React, { useState } from "react";
import { Col, Form, Row, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const LogIn: React.FC = () => {
  const [empId, setEmpId] = useState("");
  const [user, setUser] = useLocalStorage("user", "");
  const history = useHistory();
  const handleLogIn = async () => {
    await setUser(empId);
    history.push("/");
  };
  if (user) {
    history.push("/");
  }
  return (
    <>
      <Header />
      <main className="layout">
        <div className="login-container">
          <Card className="p-5">
            <Row>
              <Col md={12}>
                <Form.Control
                  placeholder="Employee ID"
                  value={empId}
                  onChange={(event) => setEmpId(event.target.value)}
                />
              </Col>
              <Col md={12} className="mt-3 text-center">
                <Button onClick={handleLogIn}>Log In</Button>
              </Col>
            </Row>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};
